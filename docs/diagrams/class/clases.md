# Diagrama de Clases (MER - Modelo Entidad-Relación)

**Archivo PlantUML:** `clases.wsd`

```plantuml
@startuml MER - Modelo Entidad-Relación

package "pacientes_schema" {
    class Paciente {
        +id: Long
        +nombre: String
        +apellido: String
        +fechaNacimiento: Date
        +telefono: String
        +email: String
    }

    class HistorialMedico {
        +id: Long
        +pacienteId: Long
        +descripcion: String
        +fecha: Date
    }

    Paciente ||--o{ HistorialMedico : tiene
}

package "medicos_schema" {
    class Medico {
        +id: Long
        +nombre: String
        +apellido: String
        +especialidadId: Long
        +telefono: String
        +email: String
    }

    class Turno {
        +id: Long
        +medicoId: Long
        +fecha: Date
        +horaInicio: Time
        +horaFin: Time
    }

    Medico ||--o{ Turno : tiene
}

package "citas_schema" {
    class Cita {
        +id: Long
        +pacienteId: Long
        +medicoId: Long
        +salaId: Long
        +hospitalId: Long
        +tipoCitaId: Long
        +estadoId: Long
        +fecha: Date
        +hora: Time
    }

    class Sala {
        +id: Long
        +nombre: String
        +hospitalId: Long
    }

    class Hospital {
        +id: Long
        +nombre: String
        +direccion: String
    }

    Hospital ||--o{ Sala : contiene
    Sala ||--o{ Cita : asignada
}

package "parametrizacion_schema" {
    class Rol {
        +id: Long
        +nombre: String
    }

    class TipoCita {
        +id: Long
        +nombre: String
        +descripcion: String
    }

    class EstadoCita {
        +id: Long
        +nombre: String
    }

    class Especialidad {
        +id: Long
        +nombre: String
        +descripcion: String
    }
}

package "seguridad_schema" {
    class Usuario {
        +id: Long
        +nombreUsuario: String
        +password: String
        +rolId: Long
        +activo: Boolean
    }
}

' Relaciones entre esquemas
Paciente ||--o| Usuario : tiene (opcional)
Medico ||--o| Usuario : tiene (opcional)
Usuario --> Rol : tiene
Cita --> TipoCita : es de tipo
Cita --> EstadoCita : tiene estado
Medico --> Especialidad : pertenece

@enduml