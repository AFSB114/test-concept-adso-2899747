"use client"

// Ejemplos de uso del sistema médico

export const EXAMPLE_USERS = {
  admin: {
    id: "1",
    email: "admin@hospital.com",
    firstName: "María",
    lastName: "González",
    role: {
      id: "1",
      name: "admin",
      displayName: "Administrador",
      permissions: [
        { resource: "dashboard", action: "read" },
        { resource: "patients", action: "create" },
        { resource: "patients", action: "read" },
        { resource: "patients", action: "update" },
        { resource: "patients", action: "delete" },
        { resource: "doctors", action: "create" },
        { resource: "doctors", action: "read" },
        { resource: "doctors", action: "update" },
        { resource: "doctors", action: "delete" },
        { resource: "appointments", action: "create" },
        { resource: "appointments", action: "read" },
        { resource: "appointments", action: "update" },
        { resource: "appointments", action: "delete" },
        { resource: "schedule", action: "read" },
        { resource: "reports", action: "read" },
        { resource: "settings", action: "read" },
        { resource: "settings", action: "update" },
      ],
    },
  },
  doctor: {
    id: "2",
    email: "doctor@hospital.com",
    firstName: "Carlos",
    lastName: "Rodríguez",
    role: {
      id: "2",
      name: "doctor",
      displayName: "Doctor",
      permissions: [
        { resource: "dashboard", action: "read" },
        { resource: "patients", action: "read" },
        { resource: "patients", action: "update" },
        { resource: "appointments", action: "read" },
        { resource: "appointments", action: "update" },
        { resource: "schedule", action: "read" },
      ],
    },
  },
  recepcionista: {
    id: "3",
    email: "recepcion@hospital.com",
    firstName: "Ana",
    lastName: "Martínez",
    role: {
      id: "3",
      name: "recepcionista",
      displayName: "Recepcionista",
      permissions: [
        { resource: "dashboard", action: "read" },
        { resource: "patients", action: "create" },
        { resource: "patients", action: "read" },
        { resource: "patients", action: "update" },
        { resource: "appointments", action: "create" },
        { resource: "appointments", action: "read" },
        { resource: "appointments", action: "update" },
        { resource: "schedule", action: "read" },
      ],
    },
  },
  paciente: {
    id: "4",
    email: "paciente@email.com",
    firstName: "Luis",
    lastName: "Pérez",
    role: {
      id: "4",
      name: "paciente",
      displayName: "Paciente",
      permissions: [
        { resource: "dashboard", action: "read" },
        { resource: "appointments", action: "read" },
        { resource: "schedule", action: "read" },
      ],
    },
  },
}

export const EXAMPLE_API_RESPONSES = {
  login: {
    success: {
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      user: EXAMPLE_USERS.admin,
      expiresIn: 3600,
    },
    error: {
      message: "Credenciales inválidas",
      code: "INVALID_CREDENTIALS",
    },
  },
  patients: {
    list: {
      data: [
        {
          id: "1",
          firstName: "Juan",
          lastName: "Pérez",
          email: "juan.perez@email.com",
          phone: "+34 600 123 456",
          dateOfBirth: "1985-03-15",
          gender: "M",
          address: "Calle Mayor 123, Madrid",
          emergencyContact: "María Pérez - +34 600 654 321",
          medicalHistory: "Hipertensión controlada",
          allergies: "Penicilina",
          isActive: true,
          createdAt: "2024-01-15T10:00:00Z",
          updatedAt: "2024-01-15T10:00:00Z",
        },
      ],
      pagination: {
        page: 1,
        limit: 10,
        total: 1,
        totalPages: 1,
      },
    },
  },
  appointments: {
    list: {
      data: [
        {
          id: "1",
          patientId: "1",
          doctorId: "1",
          date: "2024-01-20",
          time: "10:00",
          duration: 30,
          type: "consulta",
          status: "programada",
          notes: "Revisión rutinaria",
          patient: {
            id: "1",
            firstName: "Juan",
            lastName: "Pérez",
          },
          doctor: {
            id: "1",
            firstName: "Dr. Carlos",
            lastName: "Rodríguez",
            specialty: "Medicina General",
          },
        },
      ],
      pagination: {
        page: 1,
        limit: 10,
        total: 1,
        totalPages: 1,
      },
    },
  },
}

export const EXAMPLE_FORM_VALIDATIONS = {
  patient: {
    firstName: {
      required: "El nombre es obligatorio",
      minLength: "El nombre debe tener al menos 2 caracteres",
      maxLength: "El nombre no puede exceder 50 caracteres",
    },
    lastName: {
      required: "El apellido es obligatorio",
      minLength: "El apellido debe tener al menos 2 caracteres",
      maxLength: "El apellido no puede exceder 50 caracteres",
    },
    email: {
      required: "El email es obligatorio",
      pattern: "Formato de email inválido",
    },
    phone: {
      required: "El teléfono es obligatorio",
      pattern: "Formato de teléfono inválido",
    },
    dateOfBirth: {
      required: "La fecha de nacimiento es obligatoria",
      max: "La fecha no puede ser futura",
    },
  },
  appointment: {
    patientId: {
      required: "Debe seleccionar un paciente",
    },
    doctorId: {
      required: "Debe seleccionar un doctor",
    },
    date: {
      required: "La fecha es obligatoria",
      min: "La fecha no puede ser anterior a hoy",
    },
    time: {
      required: "La hora es obligatoria",
    },
  },
}

export const EXAMPLE_API_INTEGRATION = `
// Ejemplo de integración con servicios

import { patientService } from "@/lib/services/patient-service"

// Listar pacientes con filtros
const patients = await patientService.getPatients(1, 10, {
  search: "Juan",
  gender: "M",
  isActive: true
})

// Crear nuevo paciente
const newPatient = await patientService.createPatient({
  firstName: "Juan",
  lastName: "Pérez",
  email: "juan@email.com",
  phone: "+34 600 123 456",
  dateOfBirth: "1985-03-15",
  gender: "M",
  address: "Calle Mayor 123",
  emergencyContact: "María Pérez - +34 600 654 321"
})

// Actualizar paciente
const updatedPatient = await patientService.updatePatient("1", {
  phone: "+34 600 999 888"
})

// Eliminar paciente
await patientService.deletePatient("1")
`
