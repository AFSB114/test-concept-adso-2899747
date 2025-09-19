export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface UserRole {
  id: string
  name: "admin" | "doctor" | "recepcionista" | "paciente"
  permissions: Permission[]
}

export interface Permission {
  id: string
  name: string
  resource: string
  action: string
}

export interface Patient {
  id: string
  name: string
  lastName: string
  email: string
  phone: string
  birthDate: string
  userId: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface MedicalHistory {
  id: string
  patientId: string
  date: string
  diagnosis: string
  treatment: string
  notes: string
  doctorId: string
  doctor: Doctor
}

export interface Doctor {
  id: string
  name: string
  lastName: string
  email: string
  phone: string
  specialtyId: number
  userId: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface DoctorShift {
  id: string
  doctorId: string
  dayOfWeek: number // 0-6 (Domingo-Sábado)
  startTime: string // HH:mm
  endTime: string // HH:mm
  isActive: boolean
}

export interface Specialty {
  id: string
  name: string
  description: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Appointment {
  id: string
  patientId: number
  doctorId: number
  roomId?: number
  appointmentTypeId: number
  statusId: number
  date: string
  time: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface AppointmentType {
  id: string
  name: string
  duration: number // minutos
  color: string
  isActive: boolean
}

export interface AppointmentStatus {
  id: string
  name: "programada" | "confirmada" | "en_curso" | "completada" | "cancelada" | "no_asistio"
  color: string
  isActive: boolean
}

// Tipos para formularios y API
export interface ApiResponse<T> {
  message: string
  data: T
  success: boolean
}

export interface PaginatedResponse<T> {
  message: string
  data: T[]
  pagination: {
    page: number
    size: number
    totalElements: number
    totalPages: number
    first: boolean
    last: boolean
  }
  success: boolean
}

export interface ApiError {
  message: string
  errors?: Record<string, string[]>
  code: string
}

// Tipos para filtros y búsquedas
export interface PatientFilters {
  search?: string
  isActive?: boolean
}

export interface DoctorFilters {
  search?: string
  specialtyId?: number
  isActive?: boolean
}

export interface AppointmentFilters {
  search?: string
  patientId?: number
  doctorId?: number
  statusId?: number
  dateFrom?: string
  dateTo?: string
  appointmentTypeId?: number
}
