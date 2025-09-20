export interface User {
  id: number
  username: string
  password: string
  role: Role
  active: boolean
  isActive: boolean
  createdAt: string
  updatedAt: string
  deletedAt?: string
  createdBy?: string
  updatedBy?: string
  deletedBy?: string
}

export interface Role {
  id: number
  name: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  deletedAt?: string
  createdBy?: string
  updatedBy?: string
  deletedBy?: string
}

export interface UserRole {
  id: number
  name: "admin" | "doctor" | "recepcionista" | "paciente"
  permissions: Permission[]
}

export interface Permission {
  id: number
  name: string
  resource: string
  action: string
}

export interface Patient {
  id: number
  name: string
  lastName: string
  email: string
  phone: string
  birthDate: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  deletedAt?: string
  createdBy?: string
  updatedBy?: string
  deletedBy?: string
}

export interface MedicalHistory {
  id: number
  patient: Patient
  description: string
  date: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  deletedAt?: string
  createdBy?: string
  updatedBy?: string
  deletedBy?: string
}

export interface Doctor {
  id: number;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  specialty: Specialty;
  specialtyId: number;
  licenseNumber?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  createdBy?: string;
  updatedBy?: string;
  deletedBy?: string;
}

export interface DoctorShift {
  id: number
  doctor: Doctor
  date: string
  startTime: string
  endTime: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  deletedAt?: string
  createdBy?: string
  updatedBy?: string
  deletedBy?: string
}

export interface Specialty {
  id: number
  name: string
  description: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  deletedAt?: string
  createdBy?: string
  updatedBy?: string
  deletedBy?: string
}

export interface Hospital {
  id: number
  name: string
  address: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  deletedAt?: string
  createdBy?: string
  updatedBy?: string
  deletedBy?: string
}

export interface Room {
  id: number
  name: string
  hospitalId: number
  hospital: Hospital
  isActive: boolean
  createdAt: string
  updatedAt: string
  deletedAt?: string
  createdBy?: string
  updatedBy?: string
  deletedBy?: string
}

export interface Appointment {
  id: number
  patient: Patient
  doctor: Doctor
  room?: Room
  appointmentType: AppointmentType
  status: AppointmentStatus
  date: string
  time: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  deletedAt?: string
  createdBy?: string
  updatedBy?: string
  deletedBy?: string
}

export interface AppointmentType {
  id: number
  name: string
  description: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  deletedAt?: string
  createdBy?: string
  updatedBy?: string
  deletedBy?: string
}

export interface AppointmentStatus {
  id: number
  name: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  deletedAt?: string
  createdBy?: string
  updatedBy?: string
  deletedBy?: string
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

