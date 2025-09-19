# API Documentation - Medical Dashboard

## Base URL
\`\`\`
http://localhost:8080/api
\`\`\`

## Authentication

### Login
**POST** `/auth/login`

**Request Body:**
\`\`\`json
{
  "email": "admin@hospital.com",
  "password": "admin123"
}
\`\`\`

**Response:**
\`\`\`json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "1",
    "email": "admin@hospital.com",
    "firstName": "María",
    "lastName": "González",
    "role": {
      "id": "1",
      "name": "admin",
      "displayName": "Administrador",
      "permissions": [...]
    }
  },
  "expiresIn": 3600
}
\`\`\`

## Patients API

### Get Patients
**GET** `/patients?page=1&limit=10&search=Juan&gender=M&isActive=true`

**Response:**
\`\`\`json
{
  "data": [
    {
      "id": "1",
      "firstName": "Juan",
      "lastName": "Pérez",
      "email": "juan.perez@email.com",
      "phone": "+34 600 123 456",
      "dateOfBirth": "1985-03-15",
      "gender": "M",
      "address": "Calle Mayor 123, Madrid",
      "emergencyContact": "María Pérez - +34 600 654 321",
      "medicalHistory": "Hipertensión controlada",
      "allergies": "Penicilina",
      "isActive": true,
      "createdAt": "2024-01-15T10:00:00Z",
      "updatedAt": "2024-01-15T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1
  }
}
\`\`\`

### Create Patient
**POST** `/patients`

**Request Body:**
\`\`\`json
{
  "firstName": "Juan",
  "lastName": "Pérez",
  "email": "juan.perez@email.com",
  "phone": "+34 600 123 456",
  "dateOfBirth": "1985-03-15",
  "gender": "M",
  "address": "Calle Mayor 123, Madrid",
  "emergencyContact": "María Pérez - +34 600 654 321",
  "medicalHistory": "Hipertensión controlada",
  "allergies": "Penicilina"
}
\`\`\`

### Update Patient
**PUT** `/patients/:id`

### Delete Patient
**DELETE** `/patients/:id`

## Doctors API

### Get Doctors
**GET** `/doctors?page=1&limit=10&search=Carlos&specialtyId=1&isActive=true`

**Response:**
\`\`\`json
{
  "data": [
    {
      "id": "1",
      "firstName": "Carlos",
      "lastName": "Rodríguez",
      "email": "carlos.rodriguez@hospital.com",
      "phone": "+34 600 789 123",
      "licenseNumber": "28123456",
      "specialtyId": "1",
      "specialty": {
        "id": "1",
        "name": "Medicina General",
        "description": "Atención médica general"
      },
      "shifts": [
        {
          "dayOfWeek": 1,
          "startTime": "09:00",
          "endTime": "17:00"
        }
      ],
      "isActive": true,
      "createdAt": "2024-01-15T10:00:00Z",
      "updatedAt": "2024-01-15T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1
  }
}
\`\`\`

## Appointments API

### Get Appointments
**GET** `/appointments?page=1&limit=10&patientId=1&doctorId=1&status=programada&date=2024-01-20`

**Response:**
\`\`\`json
{
  "data": [
    {
      "id": "1",
      "patientId": "1",
      "doctorId": "1",
      "date": "2024-01-20",
      "time": "10:00",
      "duration": 30,
      "type": "consulta",
      "status": "programada",
      "notes": "Revisión rutinaria",
      "patient": {
        "id": "1",
        "firstName": "Juan",
        "lastName": "Pérez",
        "phone": "+34 600 123 456"
      },
      "doctor": {
        "id": "1",
        "firstName": "Carlos",
        "lastName": "Rodríguez",
        "specialty": "Medicina General"
      },
      "createdAt": "2024-01-15T10:00:00Z",
      "updatedAt": "2024-01-15T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1
  }
}
\`\`\`

### Create Appointment
**POST** `/appointments`

**Request Body:**
\`\`\`json
{
  "patientId": "1",
  "doctorId": "1",
  "date": "2024-01-20",
  "time": "10:00",
  "duration": 30,
  "type": "consulta",
  "notes": "Revisión rutinaria"
}
\`\`\`

## Specialties API

### Get Specialties
**GET** `/specialties`

**Response:**
\`\`\`json
{
  "data": [
    {
      "id": "1",
      "name": "Medicina General",
      "description": "Atención médica general y preventiva",
      "isActive": true,
      "createdAt": "2024-01-15T10:00:00Z",
      "updatedAt": "2024-01-15T10:00:00Z"
    }
  ]
}
\`\`\`

## Error Responses

### 400 Bad Request
\`\`\`json
{
  "message": "Datos de entrada inválidos",
  "errors": [
    {
      "field": "email",
      "message": "El email es obligatorio"
    }
  ]
}
\`\`\`

### 401 Unauthorized
\`\`\`json
{
  "message": "Token de acceso inválido o expirado"
}
\`\`\`

### 403 Forbidden
\`\`\`json
{
  "message": "No tienes permisos para realizar esta acción"
}
\`\`\`

### 404 Not Found
\`\`\`json
{
  "message": "Recurso no encontrado"
}
\`\`\`

### 500 Internal Server Error
\`\`\`json
{
  "message": "Error interno del servidor"
}
