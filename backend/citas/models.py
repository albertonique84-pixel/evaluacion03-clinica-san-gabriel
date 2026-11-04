from django.core.validators import RegexValidator
from django.db import models


class Especialidad(models.Model):
    nombre = models.CharField(max_length=80, unique=True)
    descripcion = models.TextField(blank=True)

    class Meta:
        verbose_name_plural = 'especialidades'
        ordering = ['nombre']

    def __str__(self):
        return self.nombre


class Medico(models.Model):
    nombres = models.CharField(max_length=120)
    cmp = models.CharField('CMP', max_length=10, unique=True)
    # PROTECT: no se puede borrar una especialidad que todavía tiene médicos
    especialidad = models.ForeignKey(
        Especialidad, on_delete=models.PROTECT, related_name='medicos'
    )
    telefono = models.CharField(max_length=15, blank=True)
    correo = models.EmailField(blank=True)

    class Meta:
        verbose_name = 'médico'
        ordering = ['nombres']

    def __str__(self):
        return f'Dr(a). {self.nombres} - CMP {self.cmp}'


class Paciente(models.Model):
    dni = models.CharField(
        'DNI',
        max_length=8,
        unique=True,
        validators=[RegexValidator(r'^\d{8}$', 'El DNI debe tener exactamente 8 dígitos.')],
    )
    nombres = models.CharField(max_length=120)
    fecha_nacimiento = models.DateField()
    telefono = models.CharField(max_length=15, blank=True)
    correo = models.EmailField(blank=True)

    class Meta:
        ordering = ['nombres']

    def __str__(self):
        return f'{self.nombres} ({self.dni})'


class EstadoCita(models.Model):
    nombre = models.CharField(max_length=30, unique=True)
    es_final = models.BooleanField(default=False)

    class Meta:
        verbose_name = 'estado de cita'
        verbose_name_plural = 'estados de cita'

    def __str__(self):
        return self.nombre


class Cita(models.Model):
    # CASCADE: si se elimina el paciente, sus citas ya no tienen sentido
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE, related_name='citas')
    # PROTECT: no se puede eliminar un médico que tiene citas registradas
    medico = models.ForeignKey(Medico, on_delete=models.PROTECT, related_name='citas')
    fecha = models.DateField()
    hora = models.TimeField()
    motivo = models.CharField(max_length=200)
    estado = models.ForeignKey(EstadoCita, on_delete=models.PROTECT, related_name='citas')

    class Meta:
        ordering = ['fecha', 'hora']
        constraints = [
            models.UniqueConstraint(
                fields=['medico', 'fecha', 'hora'], name='unica_cita_medico_fecha_hora'
            )
        ]

    def __str__(self):
        return f'{self.fecha} {self.hora:%H:%M} - {self.paciente.nombres} con {self.medico.nombres}'


class HistoriaClinica(models.Model):
    GRUPOS = [
        ('O+', 'O+'), ('O-', 'O-'), ('A+', 'A+'), ('A-', 'A-'),
        ('B+', 'B+'), ('B-', 'B-'), ('AB+', 'AB+'), ('AB-', 'AB-'),
    ]
    paciente = models.OneToOneField(Paciente, on_delete=models.CASCADE, related_name='historia')
    grupo_sanguineo = models.CharField(max_length=3, choices=GRUPOS)
    alergias = models.TextField(blank=True)
    antecedentes = models.TextField(blank=True)

    class Meta:
        verbose_name = 'historia clínica'
        verbose_name_plural = 'historias clínicas'

    def __str__(self):
        return f'Historia clínica de {self.paciente.nombres}'
