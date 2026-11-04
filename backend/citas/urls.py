from rest_framework.routers import DefaultRouter

from .views import (
    CitaViewSet,
    EspecialidadViewSet,
    EstadoCitaViewSet,
    HistoriaClinicaViewSet,
    MedicoViewSet,
    PacienteViewSet,
)

router = DefaultRouter()
router.register('especialidades', EspecialidadViewSet)
router.register('medicos', MedicoViewSet, basename='medico')
router.register('pacientes', PacienteViewSet)
router.register('estados', EstadoCitaViewSet)
router.register('historias', HistoriaClinicaViewSet)
router.register('citas', CitaViewSet, basename='cita')

urlpatterns = router.urls
