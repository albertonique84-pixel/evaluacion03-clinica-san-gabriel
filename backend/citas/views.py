from rest_framework import viewsets

from .models import Cita, Especialidad, EstadoCita, HistoriaClinica, Medico, Paciente
from .serializers import (
    CitaSerializer,
    EspecialidadSerializer,
    EstadoCitaSerializer,
    HistoriaClinicaSerializer,
    MedicoSerializer,
    PacienteSerializer,
)


class EspecialidadViewSet(viewsets.ModelViewSet):
    queryset = Especialidad.objects.all()
    serializer_class = EspecialidadSerializer


class MedicoViewSet(viewsets.ModelViewSet):
    serializer_class = MedicoSerializer

    def get_queryset(self):
        # /api/medicos/?especialidad=<id>
        queryset = Medico.objects.select_related('especialidad')
        especialidad = self.request.query_params.get('especialidad')
        if especialidad:
            queryset = queryset.filter(especialidad_id=especialidad)
        return queryset


class PacienteViewSet(viewsets.ModelViewSet):
    queryset = Paciente.objects.all()
    serializer_class = PacienteSerializer


class EstadoCitaViewSet(viewsets.ModelViewSet):
    queryset = EstadoCita.objects.all()
    serializer_class = EstadoCitaSerializer


class HistoriaClinicaViewSet(viewsets.ModelViewSet):
    queryset = HistoriaClinica.objects.select_related('paciente')
    serializer_class = HistoriaClinicaSerializer


class CitaViewSet(viewsets.ModelViewSet):
    serializer_class = CitaSerializer

    def get_queryset(self):
        # /api/citas/?fecha=<aaaa-mm-dd>
        queryset = Cita.objects.select_related(
            'paciente', 'medico__especialidad', 'estado'
        )
        fecha = self.request.query_params.get('fecha')
        if fecha:
            queryset = queryset.filter(fecha=fecha)
        return queryset
