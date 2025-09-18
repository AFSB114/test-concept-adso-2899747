# Backend Architecture - Hospital Appointment Management System

## Introduction

This document describes the backend architecture for the **Hospital Appointment Management System**, an application developed with Java and Spring Boot that allows managing medical appointments, patients, doctors, and all necessary parametrization for a hospital.

## Technologies Used

### Core Technologies
- **Java 17+**: Main programming language.
- **Spring Boot 3.x**: Framework for rapid Java application development.
- **Spring Data JPA**: Abstraction for relational data access.
- **PostgreSQL 15+**: Relational database with native schema support.

### Additional Libraries
- **Lombok**: Reduction of repetitive code.
- **Swagger/OpenAPI**: Automatic API documentation.

### DevOps & Tools
- **Maven**: Dependency management and build.
- **Git**: Version control.

## General Architecture

The system follows a modular architecture with clear responsibility separation. Each module handles a specific part of the business domain, maintaining organized and maintainable code.

## Folder Structure

```
src/main/java/com/hospital/
├── config/                    # Global configurations
├── patients/                  # Patients Module
│   ├── controller/            # REST endpoints
│   ├── service/               # Business logic
│   ├── repository/            # Data access
│   └── model/                 # JPA entities
├── doctors/                   # Doctors Module
│   ├── controller/
│   ├── service/
│   ├── repository/
│   └── model/
├── appointments/              # Appointments Module
│   ├── controller/
│   ├── service/
│   ├── repository/
│   └── model/
├── parameterization/          # Parameterization Module
│   ├── controller/
│   ├── service/
│   ├── repository/
│   └── model/
├── security/                  # Security Module
│   ├── controller/
│   ├── service/
│   ├── repository/
│   └── model/
└── HospitalApplication.java   # Main class
```

## Module Descriptions

### Patients Module
Manages hospital patient information.
- **patient**: Personal data and contact information
- **medical_history**: Patient medical records

### Doctors Module
Handles medical professional information.
- **doctor**: Medical professional information
- **shift**: Doctor work schedules

### Appointments Module
Controls medical appointment programming and management.
- **appointment**: Scheduled appointment information
- **room**: Hospital physical spaces
- **hospital**: Medical center information

### Parameterization Module
Contains system master data and configurations.
- **role**: User roles in the system
- **appointment_type**: Available medical consultation types
- **appointment_status**: Possible appointment statuses
- **specialty**: Medical specialties

### Security Module
Manages user access credentials.
- **user**: User authentication information
- **Note**: Patients and doctors have a one-to-one relationship with users for authentication purposes

## REST API

The API will expose CRUD endpoints for entities by module:

### Patients API
```
GET    /api/patients              # List patients
GET    /api/patients/{id}         # Get patient by ID
POST   /api/patients              # Create patient
PUT    /api/patients/{id}         # Update patient
DELETE /api/patients/{id}         # Delete patient
GET    /api/patients/{id}/history # Get medical history
POST   /api/patients/{id}/history # Add medical record
```

### Doctors API
```
GET    /api/doctors               # List doctors
GET    /api/doctors/{id}          # Get doctor by ID
POST   /api/doctors               # Create doctor
PUT    /api/doctors/{id}          # Update doctor
DELETE /api/doctors/{id}          # Delete doctor
GET    /api/doctors/{id}/shifts   # Get doctor shifts
POST   /api/doctors/{id}/shifts   # Add shift
```

### Appointments API
```
GET    /api/appointments          # List appointments
GET    /api/appointments/{id}     # Get appointment by ID
POST   /api/appointments          # Create appointment
PUT    /api/appointments/{id}     # Update appointment
DELETE /api/appointments/{id}     # Delete appointment
GET    /api/appointments/patient/{id} # Patient appointments
GET    /api/appointments/doctor/{id}  # Doctor appointments
```

### Parameterization API
```
GET    /api/roles                 # List roles
GET    /api/appointment-types     # List appointment types
GET    /api/appointment-statuses  # List appointment statuses
GET    /api/specialties           # List specialties
```

### Security API
```
GET    /api/users                 # List users
GET    /api/users/{id}            # Get user by ID
POST   /api/users                 # Create user
PUT    /api/users/{id}            # Update user
DELETE /api/users/{id}            # Delete user
```

## Database

### Schema Strategy
Each module has its own schema in PostgreSQL to maintain data separation and facilitate maintenance.

### System Schemas

#### patients_schema
```sql
CREATE TABLE patient (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    birth_date DATE,
    phone VARCHAR(20),
    email VARCHAR(150),
    user_id BIGINT REFERENCES security_schema.user(id)
);

CREATE TABLE medical_history (
    id BIGSERIAL PRIMARY KEY,
    patient_id BIGINT NOT NULL REFERENCES patient(id),
    description TEXT NOT NULL,
    date TIMESTAMP NOT NULL
);
```

#### doctors_schema
```sql
CREATE TABLE doctor (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    specialty_id BIGINT NOT NULL REFERENCES parameterization_schema.specialty(id),
    phone VARCHAR(20),
    email VARCHAR(150),
    user_id BIGINT REFERENCES security_schema.user(id)
);

CREATE TABLE shift (
    id BIGSERIAL PRIMARY KEY,
    doctor_id BIGINT NOT NULL REFERENCES doctor(id),
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL
);
```

#### appointments_schema
```sql
CREATE TABLE hospital (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    address TEXT
);

CREATE TABLE room (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    hospital_id BIGINT NOT NULL REFERENCES hospital(id)
);

CREATE TABLE appointment (
    id BIGSERIAL PRIMARY KEY,
    patient_id BIGINT NOT NULL REFERENCES patients_schema.patient(id),
    doctor_id BIGINT NOT NULL REFERENCES doctors_schema.doctor(id),
    room_id BIGINT REFERENCES room(id),
    appointment_type_id BIGINT NOT NULL REFERENCES parameterization_schema.appointment_type(id),
    status_id BIGINT NOT NULL REFERENCES parameterization_schema.appointment_status(id),
    date DATE NOT NULL,
    time TIME NOT NULL
);
```

#### parameterization_schema
```sql
CREATE TABLE role (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE appointment_type (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT
);

CREATE TABLE appointment_status (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE specialty (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT
);
```

#### security_schema
```sql
CREATE TABLE user (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role_id BIGINT NOT NULL REFERENCES parameterization_schema.role(id),
    active BOOLEAN DEFAULT TRUE
);
```

## Architecture Pattern

### MVC Pattern by Module
Each module follows the Model-View-Controller pattern:
- **Model**: JPA entities representing database tables
- **Repository**: Interfaces extending JpaRepository for data access
- **Service**: Module business logic
- **Controller**: REST endpoints exposing functionality

### Advantages of the Approach
- **Clear separation**: Each module is independent
- **Maintainability**: Easy to locate and modify code
- **Scalability**: New modules can be added without affecting others
- **Testability**: Each module can be tested in isolation

## Conclusion

This architecture provides a solid and simple foundation for the Hospital Appointment Management System. The module separation facilitates development and maintenance, while Spring Boot accelerates the development process.

The system is designed to be functional from the start, with room for adding more advanced features like security and microservices in the future.