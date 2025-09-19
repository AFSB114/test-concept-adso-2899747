import { apiClient } from "@/lib/api"
import type { Appointment, AppointmentFilters, PaginatedResponse, ApiResponse } from "@/lib/types"

export class AppointmentService {
  async getAppointments(page = 1, size = 10, filters?: AppointmentFilters): Promise<PaginatedResponse<Appointment>> {
    const params = {
      page: page - 1, // Backend usa 0-based indexing
      size,
      ...filters,
    }
    return apiClient.get<PaginatedResponse<Appointment>>(
      "/api/appointments/paginated",
      params
    );
  }

  async getAppointment(id: string): Promise<ApiResponse<Appointment>> {
    return apiClient.get<ApiResponse<Appointment>>(`/api/appointments/${id}`);
  }

  async createAppointment(
    appointment: Omit<Appointment, "id" | "createdAt" | "updatedAt">,
  ): Promise<ApiResponse<Appointment>> {
    return apiClient.post<ApiResponse<Appointment>>(
      "/api/appointments",
      appointment
    );
  }

  async updateAppointment(id: string, appointment: Partial<Appointment>): Promise<ApiResponse<Appointment>> {
    return apiClient.put<ApiResponse<Appointment>>(
      `/api/appointments/${id}`,
      appointment
    );
  }

  async deleteAppointment(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<ApiResponse<void>>(`/api/appointments/${id}`);
  }

  async getPatientAppointments(patientId: string): Promise<ApiResponse<Appointment[]>> {
    return apiClient.get<ApiResponse<Appointment[]>>(
      `/api/appointments/patient/${patientId}`
    );
  }

  async getDoctorAppointments(doctorId: string, date?: string): Promise<ApiResponse<Appointment[]>> {
    const params = date ? { date } : {}
    return apiClient.get<ApiResponse<Appointment[]>>(
      `/api/appointments/doctor/${doctorId}`,
      params
    );
  }

}

export const appointmentService = new AppointmentService()
