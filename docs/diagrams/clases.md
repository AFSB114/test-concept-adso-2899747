# Diagrama de Clases

```mermaid
classDiagram
    class Paciente {
        +id: int
        +nombre: string
        +apellido: string
        +fechaNacimiento: date
        +telefono: string
        +email: string
        +agendarCita()
        +verHistorial()
    }
    class Medico {
        +id: int
        +nombre: string
        +apellido: string
        +especialidadId: int
        +telefono: string
        +email: string
        +verCitas()
        +actualizarHistorial()
    }
    class Cita {
        +id: int
        +pacienteId: int
        +medicoId: int
        +fecha: date
        +hora: time
        +estado: string
    }
    class Especialidad {
        +id: int
        +nombre: string
    }
    class Hospital {
        +id: int
        +nombre: string
        +direccion: string
    }
    class Sala {
        +id: int
        +nombre: string
        +hospitalId: int
    }
    Paciente ||--o{ Cita : tiene
    Medico ||--o{ Cita : asignado
    Medico --> Especialidad : pertenece
    Hospital ||--o{ Sala : contiene