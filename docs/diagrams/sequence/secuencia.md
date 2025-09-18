# Diagrama de Secuencia - Agendar Cita

**Archivo PlantUML:** `secuencia.wsd`

```plantuml
@startuml Diagrama de Secuencia - Agendar Cita

actor Paciente as P
participant "Sistema" as S
participant "Médico" as M

P -> S: Solicitar agendar cita
S -> P: Mostrar médicos disponibles
P -> S: Seleccionar médico y fecha
S -> M: Verificar disponibilidad
M -> S: Confirmar disponibilidad
S -> P: Cita agendada exitosamente
S -> M: Notificar nueva cita

@enduml