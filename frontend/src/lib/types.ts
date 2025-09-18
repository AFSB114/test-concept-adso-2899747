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
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  gender: "M" | "F" | "Otro"
  address: string
  emergencyContact: string
  emergencyPhone: string
  medicalHistory: MedicalHistory[]
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
  firstName: string
  lastName: string
  email: string
  phone: string
  specialtyId: string
  specialty: Specialty
  licenseNumber: string
  shifts: DoctorShift[]
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
}

export interface Appointment {
  id: string
  patientId: string
  patient: Patient
  doctorId: string
  doctor: Doctor
  appointmentTypeId: string
  appointmentType: AppointmentType
  statusId: string
  status: AppointmentStatus
  scheduledDate: string
  scheduledTime: string
  duration: number // minutos
  notes: string
  roomNumber?: string
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
  data: T
  message: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    size: number
    total: number
    totalPages: number
  }
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
  gender?: string
  ageRange?: {
    min: number
    max: number
  }
}

export interface DoctorFilters {
  search?: string
  specialtyId?: string
  isActive?: boolean
}

export interface AppointmentFilters {
  search?: string
  patientId?: string
  doctorId?: string
  statusId?: string
  dateFrom?: string
  dateTo?: string
  appointmentTypeId?: string
}
