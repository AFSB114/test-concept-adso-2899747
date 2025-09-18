# Arquitectura del Backend - Sistema de Gestión de Citas Hospitalarias

## Introducción

Este documento describe la arquitectura del backend para el **Sistema de Gestión de Citas Hospitalarias**, una aplicación desarrollada con Java y Spring Boot que permite gestionar citas médicas, pacientes, médicos, y toda la parametrización necesaria para un hospital.

## Tecnologías Utilizadas

### Core Technologies
- **Java 17+**: Lenguaje de programación principal.
- **Spring Boot 3.x**: Framework para desarrollo rápido de aplicaciones Java.
- **Spring Data JPA**: Para acceso a datos relacional.
- **PostgreSQL 15+**: Base de datos relacional con soporte para esquemas.

### Additional Libraries
- **Lombok**: Reducción de código repetitivo.
- **Swagger/OpenAPI**: Documentación automática de APIs.

### DevOps & Tools
- **Maven**: Gestión de dependencias y build.
- **Git**: Control de versiones.

## Arquitectura General

El sistema sigue una arquitectura modular con separación clara de responsabilidades. Cada módulo maneja una parte específica del dominio del negocio, manteniendo el código organizado y fácil de mantener.

## Estructura de Carpetas

```
src/main/java/com/hospital/
├── config/                    # Configuraciones globales (BD, web)
├── pacientes/                 # Módulo Pacientes
│   ├── controller/            # Endpoints REST
│   ├── service/               # Lógica de negocio
│   ├── repository/            # Acceso a datos
│   └── model/                 # Entidades JPA
├── medicos/                   # Módulo Médicos
│   ├── controller/
│   ├── service/
│   ├── repository/
│   └── model/
├── citas/                     # Módulo Citas
│   ├── controller/
│   ├── service/
│   ├── repository/
│   └── model/
├── parametrizacion/           # Módulo Parametrización
│   ├── controller/
│   ├── service/
│   ├── repository/
│   └── model/
├── seguridad/                 # Módulo Seguridad
│   ├── controller/
│   ├── service/
│   ├── repository/
│   └── model/
└── HospitalApplication.java   # Clase principal
```

## Descripción de Módulos

### Módulo Pacientes
Gestiona la información de los pacientes del hospital.
- **Paciente**: Datos personales y de contacto
- **HistorialMedico**: Registros médicos del paciente

### Módulo Médicos
Maneja la información de los profesionales médicos.
- **Medico**: Información del profesional médico
- **Turno**: Horarios de trabajo de los médicos

### Módulo Citas
Controla la programación y gestión de citas médicas.
- **Cita**: Información de la cita programada
- **Sala**: Espacios físicos donde se atienden las citas
- **Hospital**: Información de los centros médicos

### Módulo Parametrización
Contiene los datos maestros y configuraciones del sistema.
- **Rol**: Roles de usuario en el sistema
- **TipoCita**: Tipos de consulta médica disponibles
- **EstadoCita**: Estados posibles de una cita
- **Especialidad**: Especialidades médicas

### Módulo Seguridad
Gestiona los usuarios y sus credenciales de acceso.
- **Usuario**: Información de autenticación de usuarios

## API REST

La API expondrá endpoints para operaciones CRUD en las entidades por módulo:

### Pacientes API
```
GET    /api/pacientes              # Listar pacientes
GET    /api/pacientes/{id}         # Obtener paciente por ID
POST   /api/pacientes              # Crear paciente
PUT    /api/pacientes/{id}         # Actualizar paciente
DELETE /api/pacientes/{id}         # Eliminar paciente
GET    /api/pacientes/{id}/historial # Obtener historial médico
POST   /api/pacientes/{id}/historial # Agregar registro médico
```

### Médicos API
```
GET    /api/medicos                # Listar médicos
GET    /api/medicos/{id}           # Obtener médico por ID
POST   /api/medicos                # Crear médico
PUT    /api/medicos/{id}           # Actualizar médico
DELETE /api/medicos/{id}           # Eliminar médico
GET    /api/medicos/{id}/turnos    # Obtener turnos del médico
POST   /api/medicos/{id}/turnos    # Agregar turno
```

### Citas API
```
GET    /api/citas                  # Listar citas
GET    /api/citas/{id}             # Obtener cita por ID
POST   /api/citas                  # Crear cita
PUT    /api/citas/{id}             # Actualizar cita
DELETE /api/citas/{id}             # Eliminar cita
GET    /api/citas/paciente/{id}    # Citas de un paciente
GET    /api/citas/medico/{id}      # Citas de un médico
```

### Parametrización API
```
GET    /api/roles                  # Listar roles
GET    /api/tipos-cita             # Listar tipos de cita
GET    /api/estados-cita           # Listar estados de cita
GET    /api/especialidades         # Listar especialidades
```

### Seguridad API
```
GET    /api/usuarios               # Listar usuarios
GET    /api/usuarios/{id}          # Obtener usuario por ID
POST   /api/usuarios               # Crear usuario
PUT    /api/usuarios/{id}          # Actualizar usuario
DELETE /api/usuarios/{id}          # Eliminar usuario
```

## Base de Datos

### Estrategia de Esquemas
Cada módulo tiene su propio esquema en PostgreSQL para mantener la separación de datos y facilitar el mantenimiento.

### Esquemas del Sistema

#### pacientes_schema
```sql
CREATE TABLE pacientes (
    id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE,
    telefono VARCHAR(20),
    email VARCHAR(150)
);

CREATE TABLE historial_medico (
    id BIGSERIAL PRIMARY KEY,
    paciente_id BIGINT NOT NULL REFERENCES pacientes(id),
    descripcion TEXT NOT NULL,
    fecha TIMESTAMP NOT NULL
);
```

#### medicos_schema
```sql
CREATE TABLE medicos (
    id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    especialidad_id BIGINT NOT NULL,
    telefono VARCHAR(20),
    email VARCHAR(150)
);

CREATE TABLE turnos (
    id BIGSERIAL PRIMARY KEY,
    medico_id BIGINT NOT NULL REFERENCES medicos(id),
    fecha DATE NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL
);
```

#### citas_schema
```sql
CREATE TABLE hospitales (
    id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    direccion TEXT
);

CREATE TABLE salas (
    id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    hospital_id BIGINT NOT NULL REFERENCES hospitales(id)
);

CREATE TABLE citas (
    id BIGSERIAL PRIMARY KEY,
    paciente_id BIGINT NOT NULL,
    medico_id BIGINT NOT NULL,
    sala_id BIGINT REFERENCES salas(id),
    hospital_id BIGINT REFERENCES hospitales(id),
    tipo_cita_id BIGINT NOT NULL,
    estado_id BIGINT NOT NULL,
    fecha DATE NOT NULL,
    hora TIME NOT NULL
);
```

#### parametrizacion_schema
```sql
CREATE TABLE roles (
    id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

CREATE TABLE tipos_cita (
    id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT
);

CREATE TABLE estados_cita (
    id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

CREATE TABLE especialidades (
    id BIGSERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);
```

#### seguridad_schema
```sql
CREATE TABLE usuarios (
    id BIGSERIAL PRIMARY KEY,
    nombre_usuario VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol_id BIGINT NOT NULL,
    paciente_id BIGINT,
    medico_id BIGINT
);
```

## Patrón de Arquitectura

### Patrón MVC por Módulo
Cada módulo sigue el patrón Model-View-Controller:
- **Model**: Entidades JPA que representan las tablas de la base de datos
- **Repository**: Interfaces que extienden JpaRepository para acceso a datos
- **Service**: Lógica de negocio del módulo
- **Controller**: Endpoints REST que exponen la funcionalidad

### Ventajas del Enfoque
- **Separación clara**: Cada módulo es independiente
- **Mantenibilidad**: Fácil localizar y modificar código
- **Escalabilidad**: Se pueden agregar nuevos módulos sin afectar otros
- **Testabilidad**: Cada módulo se puede probar de forma aislada

## Conclusión

Esta arquitectura proporciona una base sólida y simple para el Sistema de Gestión de Citas Hospitalarias. La separación por módulos facilita el desarrollo y mantenimiento del código, mientras que el uso de Spring Boot acelera el proceso de desarrollo.

El sistema está diseñado para ser funcional desde el inicio, con espacio para agregar características más avanzadas como seguridad y microservicios en el futuro.