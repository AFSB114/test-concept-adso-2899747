# Entity-Relationship Model (MER) Diagram

**PlantUML File:** `clases.wsd`

```plantuml
@startuml Entity-Relationship Model (MER)

package "patients_schema" {
    class Patient {
        +id: Long
        +name: String
        +lastName: String
        +birthDate: Date
        +phone: String
        +email: String
    }

    class MedicalHistory {
        +id: Long
        +patientId: Long
        +description: String
        +date: Date
    }

    Patient ||--o{ MedicalHistory : has
}

package "doctors_schema" {
    class Doctor {
        +id: Long
        +name: String
        +lastName: String
        +specialtyId: Long
        +phone: String
        +email: String
    }

    class Shift {
        +id: Long
        +doctorId: Long
        +date: Date
        +startTime: Time
        +endTime: Time
    }

    Doctor ||--o{ Shift : has
}

package "appointments_schema" {
    class Appointment {
        +id: Long
        +patientId: Long
        +doctorId: Long
        +roomId: Long
        +hospitalId: Long
        +appointmentTypeId: Long
        +statusId: Long
        +date: Date
        +time: Time
    }

    class Room {
        +id: Long
        +name: String
        +hospitalId: Long
    }

    class Hospital {
        +id: Long
        +name: String
        +address: String
    }

    Hospital ||--o{ Room : contains
    Room ||--o{ Appointment : assigned
}

package "parameterization_schema" {
    class Role {
        +id: Long
        +name: String
    }

    class AppointmentType {
        +id: Long
        +name: String
        +description: String
    }

    class AppointmentStatus {
        +id: Long
        +name: String
    }

    class Specialty {
        +id: Long
        +name: String
        +description: String
    }
}

package "security_schema" {
    class User {
        +id: Long
        +username: String
        +password: String
        +roleId: Long
        +active: Boolean
    }
}

' Relationships between schemas
Patient ||--o| User : has (optional)
Doctor ||--o| User : has (optional)
User --> Role : has
Appointment --> AppointmentType : is of type
Appointment --> AppointmentStatus : has status
Doctor --> Specialty : belongs to

@enduml