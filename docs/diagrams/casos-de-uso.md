# Diagrama de Casos de Uso

```mermaid
graph TD
    A[Paciente] --> B[Agendar Cita]
    A --> C[Ver Historial Médico]
    D[Médico] --> E[Ver Citas Asignadas]
    D --> F[Actualizar Historial Médico]
    G[Administrador] --> H[Gestionar Pacientes]
    G --> I[Gestionar Médicos]
    G --> J[Gestionar Citas]
    G --> K[Gestionar Hospitales y Salas]