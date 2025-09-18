# Diagrama de Secuencia - Agendar Cita

```mermaid
sequenceDiagram
    participant P as Paciente
    participant S as Sistema
    participant M as Médico
    P->>S: Solicitar agendar cita
    S->>P: Mostrar médicos disponibles
    P->>S: Seleccionar médico y fecha
    S->>M: Verificar disponibilidad
    M->>S: Confirmar disponibilidad
    S->>P: Cita agendada exitosamente
    S->>M: Notificar nueva cita