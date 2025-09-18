# Historia de Usuario: HU-Documentación

## Descripción
Como aprendiz, necesito crear y refinar toda la documentación del proyecto "Sistema de Gestión de Citas Hospitalarias" para que el evaluador pueda entender completamente la arquitectura, funcionalidad y estructura del sistema.

## Criterios de Aceptación
- [x] Diagramas UML completos (Casos de Uso, Clases, Secuencia, Paquetes) en PlantUML
- [x] Arquitectura refactorizada a Java/Spring Boot con módulos
- [x] Modelo Entidad-Relación (MER) separado por esquemas de BD
- [x] Diagrama de clases UML con relaciones de composición
- [x] Landing Page con presentación gráfica actualizada
- [x] Arquitectura del backend documentada y simplificada
- [x] Estructura de carpetas clara por módulos
- [x] Entidades organizadas en 5 módulos con esquemas separados
- [x] Diagramas organizados por carpetas (usecase, class, sequence, package)
- [x] Flujo Git implementado correctamente (develop → QA → release → main)

## Tareas Realizadas

### Arquitectura y Modelado
- [x] **Refactorización tecnológica**: Cambio de Node.js/Express a Java/Spring Boot
- [x] **Arquitectura modular**: 5 módulos (Pacientes, Médicos, Citas, Parametrización, Seguridad)
- [x] **Esquemas de BD**: Separación por módulos en PostgreSQL
- [x] **Patrón MVC**: Implementado por módulo con JpaRepository

### Diagramas UML en PlantUML
- [x] **Diagrama de Casos de Uso**: Separado por paquetes (Paciente, Médico, Administrador)
- [x] **Diagrama de Clases (MER)**: Solo atributos, separado por esquemas
- [x] **Diagrama de Clases UML**: Solo IDs, relaciones de composición
- [x] **Diagrama de Secuencia**: Flujo de agendar cita
- [x] **Diagrama de Paquetes**: Arquitectura modular con esquemas

### Documentación Técnica
- [x] **Arquitectura Backend**: Documento simplificado y práctico
- [x] **API REST**: Endpoints CRUD por módulo
- [x] **Base de Datos**: Esquemas SQL detallados
- [x] **Landing Page**: Actualizada con nueva arquitectura

### Organización
- [x] **Estructura de carpetas**: Diagramas organizados por tipo
- [x] **Entidades**: 12+ entidades en 5 módulos
- [x] **Módulos**: Pacientes (2), Médicos (2), Citas (3), Parametrización (4), Seguridad (1)

### Control de Versiones
- [x] **Flujo Git**: develop → QA → release → main
- [x] **HU Documentación**: Rama develop con todos los cambios
- [x] **Conexión GitHub**: Repositorio remoto configurado

## Entidades por Módulo

### Módulo Pacientes (pacientes_schema)
- **Paciente**: Datos personales y contacto
- **HistorialMedico**: Registros médicos

### Módulo Médicos (medicos_schema)
- **Medico**: Información del profesional
- **Turno**: Horarios de trabajo

### Módulo Citas (citas_schema)
- **Cita**: Información de la cita programada
- **Sala**: Espacios físicos del hospital
- **Hospital**: Centros médicos

### Módulo Parametrización (parametrizacion_schema)
- **Rol**: Roles de usuario
- **TipoCita**: Tipos de consulta
- **EstadoCita**: Estados de cita
- **Especialidad**: Especialidades médicas

### Módulo Seguridad (seguridad_schema)
- **Usuario**: Credenciales de acceso

## Tecnologías Implementadas
- **Java 17+**: Lenguaje principal
- **Spring Boot 3.x**: Framework de desarrollo
- **Spring Data JPA**: Acceso a datos
- **PostgreSQL 15+**: Base de datos relacional
- **Maven**: Gestión de dependencias
- **PlantUML**: Diagramas de arquitectura

## Estructura Final del Proyecto
```
docs/
├── diagrams/
│   ├── usecase/     # Diagramas de casos de uso
│   ├── class/       # Diagramas de clases
│   ├── sequence/    # Diagramas de secuencia
│   └── package/     # Diagramas de paquetes
├── hu/             # Historias de usuario
├── landing-page/   # Página de presentación
└── arquitectura-backend.md

backend/ (Java/Spring Boot)
├── src/main/java/com/hospital/
│   ├── pacientes/     # Módulo Pacientes
│   ├── medicos/       # Módulo Médicos
│   ├── citas/         # Módulo Citas
│   ├── parametrizacion/ # Módulo Parametrización
│   └── seguridad/     # Módulo Seguridad
└── pom.xml
```

## Estado
Completada - Rama develop con todos los cambios de documentación implementados y listos para revisión en QA.