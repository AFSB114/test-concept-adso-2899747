# Arquitectura del Backend

## Tecnologías Utilizadas
- **Node.js**: Entorno de ejecución para JavaScript en servidor.
- **Express.js**: Framework para crear APIs REST.
- **SQLite**: Base de datos ligera y embebida para simplicidad.
- **Principios**: Clean Code, separación de responsabilidades, principios SOLID.

## Estructura de Carpetas
```
backend/
├── app.js              # Punto de entrada de la aplicación
├── package.json        # Dependencias y scripts
├── src/
│   ├── controllers/    # Lógica de negocio
│   ├── models/         # Definiciones de modelos de datos
│   ├── routes/         # Definición de rutas de la API
│   └── middlewares/    # Middlewares (autenticación, validación)
└── database.db         # Archivo de base de datos SQLite
```

## API REST
La API expondrá endpoints para operaciones CRUD en las entidades principales:
- `/api/pacientes`: GET, POST, PUT, DELETE
- `/api/medicos`: GET, POST, PUT, DELETE
- `/api/citas`: GET, POST, PUT, DELETE
- `/api/especialidades`: GET, POST
- `/api/hospitales`: GET, POST
- `/api/salas`: GET, POST
- `/api/turnos`: GET, POST
- `/api/historial-medico`: GET, POST
- `/api/usuarios`: GET, POST
- `/api/roles`: GET, POST

## Base de Datos
Tablas principales:
- pacientes (id, nombre, apellido, fechaNacimiento, telefono, email)
- medicos (id, nombre, apellido, especialidadId, telefono, email)
- citas (id, pacienteId, medicoId, fecha, hora, estado)
- especialidades (id, nombre)
- hospitales (id, nombre, direccion)
- salas (id, nombre, hospitalId)
- turnos (id, medicoId, fecha, horaInicio, horaFin)
- historial_medico (id, pacienteId, descripcion, fecha)
- usuarios (id, nombreUsuario, password, rolId)
- roles (id, nombre)

## Fundamentos para Microservicios
- Separación en módulos independientes.
- Uso de middlewares para autenticación y validación.
- Preparado para escalar a microservicios con contenedores Docker y orquestación.