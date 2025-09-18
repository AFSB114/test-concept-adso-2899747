# Entity-Relationship Model (MER) Diagram

**PlantUML File:** `clases.wsd`

```plantuml
@startuml Entity-Relationship Model (MER)

package "patients_schema" {
    class patient {
        +id: Long
        +name: String
        +last_name: String
        +birth_date: Date
        +phone: String
        +email: String
    }

    class medical_history {
        +id: Long
        +patient_id: Long
        +description: String
        +date: Date
    }

    patient ||--o{ medical_history : has
}

package "doctors_schema" {
    class doctor {
        +id: Long
        +name: String
        +last_name: String
        +specialty_id: Long
        +phone: String
        +email: String
    }

    class shift {
        +id: Long
        +doctor_id: Long
        +date: Date
        +start_time: Time
        +end_time: Time
    }

    doctor ||--o{ shift : has
}

package "appointments_schema" {
    class appointment {
        +id: Long
        +patient_id: Long
        +doctor_id: Long
        +room_id: Long
        +hospital_id: Long
        +appointment_type_id: Long
        +status_id: Long
        +date: Date
        +time: Time
    }

    class room {
        +id: Long
        +name: String
        +hospital_id: Long
    }

    class hospital {
        +id: Long
        +name: String
        +address: String
    }

    hospital ||--o{ room : contains
    room ||--o{ appointment : assigned
}

package "parameterization_schema" {
    class role {
        +id: Long
        +name: String
    }

    class appointment_type {
        +id: Long
        +name: String
        +description: String
    }

    class appointment_status {
        +id: Long
        +name: String
    }

    class specialty {
        +id: Long
        +name: String
        +description: String
    }
}

package "security_schema" {
    class user {
        +id: Long
        +username: String
        +password: String
        +role_id: Long
        +active: Boolean
    }
}

' Relationships between schemas
patient ||--o| user : has (optional)
doctor ||--o| user : has (optional)
user --> role : has
appointment --> appointment_type : is of type
appointment --> appointment_status : has status
doctor --> specialty : belongs to

@enduml