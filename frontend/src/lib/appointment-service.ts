import { apiClient } from "@/lib/api"
import type { Appointment, AppointmentFilters, PaginatedResponse, ApiResponse } from "@/lib/types"

export class AppointmentService {
  async getAppointments(page = 1, size = 10, filters?: AppointmentFilters): Promise<PaginatedResponse<Appointment>> {
    const params = {
      page: page - 1, // Backend usa 0-based indexing
      size,
      ...filters,
    }
    return apiClient.get<PaginatedResponse<Appointment>>("/appointments/paginated", params)
  }

  async getAppointment(id: string): Promise<ApiResponse<Appointment>> {
    return apiClient.get<ApiResponse<Appointment>>(`/appointments/${id}`)
  }

  async createAppointment(
    appointment: Omit<Appointment, "id" | "createdAt" | "updatedAt" | "isActive">,
  ): Promise<ApiResponse<Appointment>> {
    const requestData = {
      patientId: appointment.patientId,
      doctorId: appointment.doctorId,
      roomId: appointment.roomId,
      appointmentTypeId: appointment.appointmentTypeId,
      statusId: appointment.statusId,
      date: appointment.date,
      time: appointment.time
    }
    return apiClient.post<ApiResponse<Appointment>>("/appointments", requestData)
  }

  async updateAppointment(id: string, appointment: Partial<Appointment>): Promise<ApiResponse<Appointment>> {
    const requestData = {
      patientId: appointment.patientId,
      doctorId: appointment.doctorId,
      roomId: appointment.roomId,
      appointmentTypeId: appointment.appointmentTypeId,
      statusId: appointment.statusId,
      date: appointment.date,
      time: appointment.time
    }
    return apiClient.put<ApiResponse<Appointment>>(`/appointments/${id}`, requestData)
  }

  async deleteAppointment(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<ApiResponse<void>>(`/appointments/${id}`)
  }

  async getPatientAppointments(patientId: string): Promise<ApiResponse<Appointment[]>> {
    return apiClient.get<ApiResponse<Appointment[]>>(`/appointments/patient/${patientId}`)
  }

  async getDoctorAppointments(doctorId: string, date?: string): Promise<ApiResponse<Appointment[]>> {
    const params = date ? { date } : {}
    return apiClient.get<ApiResponse<Appointment[]>>(`/appointments/doctor/${doctorId}`, params)
  }

}

export const appointmentService = new AppointmentService()
