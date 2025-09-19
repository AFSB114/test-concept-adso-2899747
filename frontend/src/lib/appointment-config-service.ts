import { apiClient } from "@/lib/api"
import type { AppointmentType, AppointmentStatus, ApiResponse } from "@/lib/types"

export class AppointmentConfigService {
  async getAppointmentTypes(): Promise<ApiResponse<AppointmentType[]>> {
    return apiClient.get<ApiResponse<AppointmentType[]>>(
      "/api/appointment-types"
    );
  }

  async getAppointmentStatuses(): Promise<ApiResponse<AppointmentStatus[]>> {
    return apiClient.get<ApiResponse<AppointmentStatus[]>>(
      "/api/appointment-statuses"
    );
  }

  async createAppointmentType(type: Omit<AppointmentType, "id">): Promise<ApiResponse<AppointmentType>> {
    return apiClient.post<ApiResponse<AppointmentType>>(
      "/api/appointment-types",
      type
    );
  }

  async updateAppointmentType(id: string, type: Partial<AppointmentType>): Promise<ApiResponse<AppointmentType>> {
    return apiClient.put<ApiResponse<AppointmentType>>(
      `/api/appointment-types/${id}`,
      type
    );
  }

  async deleteAppointmentType(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<ApiResponse<void>>(`/api/appointment-types/${id}`);
  }
}

export const appointmentConfigService = new AppointmentConfigService()
