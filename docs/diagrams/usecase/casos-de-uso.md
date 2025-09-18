# Use Cases Diagram

**PlantUML File:** `casos-de-uso.wsd`

```plantuml
@startuml Use Cases

left to right direction

actor "Patient" as P
actor "Doctor" as M
actor "Administrator" as A

package "Patient Functionalities" {
    usecase "Schedule Appointment" as UC1
    usecase "View Medical History" as UC2
    usecase "Login" as UC3
}

package "Doctor Functionalities" {
    usecase "View Assigned Appointments" as UC4
    usecase "Update Medical History" as UC5
    usecase "Login" as UC6
}

package "Administrator Functionalities" {
    usecase "Manage Patients" as UC7
    usecase "Manage Doctors" as UC8
    usecase "Manage Appointments" as UC9
    usecase "Manage Hospitals and Rooms" as UC10
    usecase "Parameterize Types and States" as UC11
    usecase "Manage Users and Roles" as UC12
}

P --> UC1
P --> UC2
P --> UC3

M --> UC4
M --> UC5
M --> UC6

A --> UC7
A --> UC8
A --> UC9
A --> UC10
A --> UC11
A --> UC12

@enduml