from datetime import date

from rest_framework import serializers

from .models import Cita, Especialidad, EstadoCita, HistoriaClinica, Medico, Paciente


class EspecialidadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Especialidad
        fields = '__all__'


class MedicoSerializer(serializers.ModelSerializer):
    especialidad_nombre = serializers.CharField(source='especialidad.nombre', read_only=True)

    class Meta:
        model = Medico
        fields = '__all__'


class PacienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paciente
        fields = '__all__'


class EstadoCitaSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstadoCita
        fields = '__all__'


class HistoriaClinicaSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistoriaClinica
        fields = '__all__'


class CitaSerializer(serializers.ModelSerializer):
    paciente_nombre = serializers.CharField(source='paciente.nombres', read_only=True)
    medico_nombre = serializers.CharField(source='medico.nombres', read_only=True)
    especialidad = serializers.CharField(source='medico.especialidad.nombre', read_only=True)
    estado_nombre = serializers.CharField(source='estado.nombre', read_only=True)
    estado_final = serializers.BooleanField(source='estado.es_final', read_only=True)

    class Meta:
        model = Cita
        fields = [
            'id', 'paciente', 'paciente_nombre', 'medico', 'medico_nombre', 'especialidad',
            'fecha', 'hora', 'motivo', 'estado', 'estado_nombre', 'estado_final',
        ]
        # la regla de horario ocupado se valida en validate() con un mensaje propio
        validators = []

    def validate(self, data):
        # en un PATCH solo llegan algunos campos: se completan con los de la cita actual
        instancia = self.instance
        medico = data.get('medico', instancia.medico if instancia else None)
        fecha = data.get('fecha', instancia.fecha if instancia else None)
        hora = data.get('hora', instancia.hora if instancia else None)

        if 'fecha' in data and fecha < date.today():
            raise serializers.ValidationError(
                {'fecha': 'No se puede registrar una cita en una fecha pasada.'}
            )

        ocupado = Cita.objects.filter(medico=medico, fecha=fecha, hora=hora)
        if instancia:
            ocupado = ocupado.exclude(pk=instancia.pk)
        if ocupado.exists():
            raise serializers.ValidationError(
                {'hora': f'El médico {medico.nombres} ya tiene una cita el {fecha} a las '
                         f'{hora.strftime("%H:%M")}. Elija otro horario.'}
            )
        return data
