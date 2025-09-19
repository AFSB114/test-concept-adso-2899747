import type { Patient, Doctor, User, UserRole, Specialty, AppointmentType, AppointmentStatus } from "./types"

export const mockRoles: UserRole[] = [
  {
    id: "1",
    name: "admin",
    permissions: [{ id: "1", name: "all", resource: "*", action: "*" }],
  },
  {
    id: "2",
    name: "doctor",
    permissions: [
      { id: "2", name: "read_patients", resource: "patients", action: "read" },
      { id: "3", name: "update_patients", resource: "patients", action: "update" },
      { id: "4", name: "read_appointments", resource: "appointments", action: "read" },
      { id: "5", name: "update_appointments", resource: "appointments", action: "update" },
      { id: "6", name: "read_schedule", resource: "schedule", action: "read" },
    ],
  },
  {
    id: "3",
    name: "recepcionista",
    permissions: [
      { id: "7", name: "read_patients", resource: "patients", action: "read" },
      { id: "8", name: "create_patients", resource: "patients", action: "create" },
      { id: "9", name: "update_patients", resource: "patients", action: "update" },
      { id: "10", name: "read_appointments", resource: "appointments", action: "read" },
      { id: "11", name: "create_appointments", resource: "appointments", action: "create" },
      { id: "12", name: "update_appointments", resource: "appointments", action: "update" },
      { id: "13", name: "read_schedule", resource: "schedule", action: "read" },
    ],
  },
  {
    id: "4",
    name: "paciente",
    permissions: [
      { id: "14", name: "read_own_appointments", resource: "appointments", action: "read" },
      { id: "15", name: "create_own_appointments", resource: "appointments", action: "create" },
    ],
  },
]

export const mockUsers: User[] = [
  {
    id: "1",
    email: "admin@hospital.com",
    firstName: "Admin",
    lastName: "Sistema",
    role: mockRoles[0],
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    email: "doctor@hospital.com",
    firstName: "Dr. Juan",
    lastName: "López",
    role: mockRoles[1],
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "3",
    email: "recep@hospital.com",
    firstName: "María",
    lastName: "González",
    role: mockRoles[2],
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
]

export const mockSpecialties: Specialty[] = [
  { id: "1", name: "Cardiología", description: "Especialidad del corazón", isActive: true },
  { id: "2", name: "Neurología", description: "Especialidad del sistema nervioso", isActive: true },
  { id: "3", name: "Pediatría", description: "Especialidad infantil", isActive: true },
  { id: "4", name: "Ginecología", description: "Especialidad femenina", isActive: true },
  { id: "5", name: "Traumatología", description: "Especialidad de huesos y articulaciones", isActive: true },
]

export const mockPatients: Patient[] = [
  {
    id: "1",
    firstName: "María",
    lastName: "García",
    email: "maria.garcia@email.com",
    phone: "+34123456789",
    dateOfBirth: "1985-03-15T00:00:00Z",
    gender: "F",
    address: "Calle Mayor 123, Madrid",
    emergencyContact: "Pedro García",
    emergencyPhone: "+34987654321",
    medicalHistory: [],
    isActive: true,
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
  },
  {
    id: "2",
    firstName: "Juan",
    lastName: "Pérez",
    email: "juan.perez@email.com",
    phone: "+34234567890",
    dateOfBirth: "1978-07-22T00:00:00Z",
    gender: "M",
    address: "Avenida de la Paz 456, Barcelona",
    emergencyContact: "Ana Pérez",
    emergencyPhone: "+34876543210",
    medicalHistory: [],
    isActive: true,
    createdAt: "2024-01-20T00:00:00Z",
    updatedAt: "2024-01-20T00:00:00Z",
  },
  {
    id: "3",
    firstName: "Ana",
    lastName: "Rodríguez",
    email: "ana.rodriguez@email.com",
    phone: "+34345678901",
    dateOfBirth: "1992-11-08T00:00:00Z",
    gender: "F",
    address: "Plaza del Sol 789, Valencia",
    emergencyContact: "Luis Rodríguez",
    emergencyPhone: "+34765432109",
    medicalHistory: [],
    isActive: true,
    createdAt: "2024-02-01T00:00:00Z",
    updatedAt: "2024-02-01T00:00:00Z",
  },
]

export const mockDoctors: Doctor[] = [
  {
    id: "1",
    firstName: "Dr. Juan",
    lastName: "López",
    email: "juan.lopez@hospital.com",
    phone: "+34111222333",
    specialtyId: "1",
    specialty: mockSpecialties[0],
    licenseNumber: "COL12345",
    shifts: [
      { id: "1", doctorId: "1", dayOfWeek: 1, startTime: "08:00", endTime: "16:00", isActive: true },
      { id: "2", doctorId: "1", dayOfWeek: 2, startTime: "08:00", endTime: "16:00", isActive: true },
      { id: "3", doctorId: "1", dayOfWeek: 3, startTime: "08:00", endTime: "16:00", isActive: true },
    ],
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    firstName: "Dra. Carmen",
    lastName: "Martínez",
    email: "carmen.martinez@hospital.com",
    phone: "+34222333444",
    specialtyId: "2",
    specialty: mockSpecialties[1],
    licenseNumber: "COL67890",
    shifts: [
      { id: "4", doctorId: "2", dayOfWeek: 2, startTime: "09:00", endTime: "17:00", isActive: true },
      { id: "5", doctorId: "2", dayOfWeek: 4, startTime: "09:00", endTime: "17:00", isActive: true },
      { id: "6", doctorId: "2", dayOfWeek: 5, startTime: "09:00", endTime: "17:00", isActive: true },
    ],
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
]

export const mockAppointmentTypes: AppointmentType[] = [
  { id: "1", name: "Consulta General", duration: 30, color: "#3b82f6", isActive: true },
  { id: "2", name: "Consulta Especializada", duration: 45, color: "#10b981", isActive: true },
  { id: "3", name: "Revisión", duration: 20, color: "#f59e0b", isActive: true },
  { id: "4", name: "Urgencia", duration: 60, color: "#ef4444", isActive: true },
]

export const mockAppointmentStatuses: AppointmentStatus[] = [
  { id: "1", name: "programada", color: "#6b7280", isActive: true },
  { id: "2", name: "confirmada", color: "#3b82f6", isActive: true },
  { id: "3", name: "en_curso", color: "#10b981", isActive: true },
  { id: "4", name: "completada", color: "#059669", isActive: true },
  { id: "5", name: "cancelada", color: "#ef4444", isActive: true },
  { id: "6", name: "no_asistio", color: "#f59e0b", isActive: true },
]
