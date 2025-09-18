# Diagrama de Paquetes

```mermaid
graph TD
    A[Módulo Pacientes] --> B[Gestión de Pacientes]
    A --> C[Historial Médico]
    D[Módulo Médicos] --> E[Gestión de Médicos]
    D --> F[Especialidades y Turnos]
    G[Módulo Citas] --> H[Gestión de Citas]
    G --> I[Asignación de Hospitales y Salas]
    J[Backend API] --> A
    J --> D
    J --> G
    K[Base de Datos] --> J