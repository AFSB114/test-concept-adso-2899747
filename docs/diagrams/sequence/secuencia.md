# Sequence Diagram - Schedule Appointment

**PlantUML File:** `secuencia.wsd`

```plantuml
@startuml Sequence Diagram - Schedule Appointment

actor Patient as P
participant "System" as S
participant "Doctor" as M

P -> S: Request to schedule appointment
S -> P: Show available doctors
P -> S: Select doctor and date
S -> M: Check availability
M -> S: Confirm availability
S -> P: Appointment successfully scheduled
S -> M: Notify new appointment

@enduml