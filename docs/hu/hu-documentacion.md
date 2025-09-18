# User Story: HU-Documentation

## Description
As a learner, I need to create and refine all the documentation for the "Hospital Appointment Management System" project so that the evaluator can fully understand the architecture, functionality, and structure of the system.

## Acceptance Criteria
- [x] Complete UML diagrams (Use Cases, Classes, Sequence, Packages) in PlantUML
- [x] Architecture refactored to Java/Spring Boot with modules
- [x] Entity-Relationship Model (MER) separated by database schemas
- [x] UML Class diagram with composition relationships
- [x] Landing Page with updated graphical presentation
- [x] Backend architecture documented and simplified
- [x] Clear folder structure by modules
- [x] Entities organized in 5 modules with separate schemas
- [x] Diagrams organized by folders (usecase, class, sequence, package)
- [x] Git flow implemented correctly (develop → QA → release → main)

## Tasks Completed

### Architecture and Modeling
- [x] **Technological refactoring**: Change from Node.js/Express to Java/Spring Boot
- [x] **Modular architecture**: 5 modules (Patients, Doctors, Appointments, Parameterization, Security)
- [x] **Database schemas**: Separation by modules in PostgreSQL
- [x] **MVC pattern**: Implemented by module with JpaRepository

### UML Diagrams in PlantUML
- [x] **Use Cases Diagram**: Separated by packages (Patient, Doctor, Administrator)
- [x] **Classes Diagram (MER)**: Only attributes, separated by schemas
- [x] **UML Classes Diagram**: Only IDs, composition relationships
- [x] **Sequence Diagram**: Appointment scheduling flow
- [x] **Package Diagram**: Modular architecture with schemas

### Technical Documentation
- [x] **Backend Architecture**: Simplified and practical document
- [x] **REST API**: CRUD endpoints by module
- [x] **Database**: Detailed SQL schemas
- [x] **Landing Page**: Updated with new architecture

### Organization
- [x] **Folder structure**: Diagrams organized by type
- [x] **Entities**: 12+ entities in 5 modules
- [x] **Modules**: Patients (2), Doctors (2), Appointments (3), Parameterization (4), Security (1)

### Version Control
- [x] **Git flow**: develop → QA → release → main
- [x] **HU Documentation**: develop branch with all changes
- [x] **GitHub connection**: Remote repository configured

## Entities by Module

### Patients Module (patients_schema)
- **Patient**: Personal data and contact
- **MedicalHistory**: Patient medical records

### Doctors Module (doctors_schema)
- **Doctor**: Medical professional information
- **Shift**: Doctor work schedules

### Appointments Module (appointments_schema)
- **Appointment**: Scheduled appointment information
- **Room**: Hospital physical spaces
- **Hospital**: Medical center information

### Parameterization Module (parameterization_schema)
- **Role**: User roles in the system
- **AppointmentType**: Available medical consultation types
- **AppointmentStatus**: Possible appointment statuses
- **Specialty**: Medical specialties

### Security Module (security_schema)
- **User**: User authentication information

## Implemented Technologies
- **Java 17+**: Main language
- **Spring Boot 3.x**: Development framework
- **Spring Data JPA**: Data access
- **PostgreSQL 15+**: Relational database
- **Maven**: Dependency management
- **PlantUML**: Architecture diagrams

## Final Project Structure
```
docs/
├── diagrams/
│   ├── usecase/     # Use case diagrams
│   ├── class/       # Class diagrams
│   ├── sequence/    # Sequence diagrams
│   └── package/     # Package diagrams
├── hu/             # User stories
├── landing-page/   # Presentation page
└── arquitectura-backend.md

backend/ (Java/Spring Boot)
├── src/main/java/com/hospital/
│   ├── patients/
│   ├── doctors/
│   ├── appointments/
│   ├── parameterization/
│   └── security/
└── pom.xml
```

## Status
Completed - develop branch with all documentation changes implemented and ready for QA review.