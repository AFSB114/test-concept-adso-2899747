import { apiClient } from "@/lib/api"
import type { Doctor, DoctorShift, DoctorFilters, PaginatedResponse, ApiResponse } from "@/lib/types"

export class DoctorService {
  async getDoctors(page = 1, size = 10, filters?: DoctorFilters): Promise<PaginatedResponse<Doctor>> {
    const params = {
      page: page - 1, // Backend usa 0-based indexing
      size,
      ...filters,
    }
    return apiClient.get<PaginatedResponse<Doctor>>("/api/doctors/paginated", params)
  }

  async getDoctor(id: string): Promise<ApiResponse<Doctor>> {
    return apiClient.get<ApiResponse<Doctor>>(`/api/doctors/${id}`)
  }

  async createDoctor(doctor: Omit<Doctor, "id" | "createdAt" | "updatedAt">): Promise<ApiResponse<Doctor>> {
    return apiClient.post<ApiResponse<Doctor>>("/api/doctors", doctor)
  }

  async updateDoctor(id: string, doctor: Partial<Doctor>): Promise<ApiResponse<Doctor>> {
    return apiClient.put<ApiResponse<Doctor>>(`/api/doctors/${id}`, doctor)
  }

  async deleteDoctor(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<ApiResponse<void>>(`/api/doctors/${id}`)
  }

  async getDoctorShifts(id: string): Promise<ApiResponse<DoctorShift[]>> {
    return apiClient.get<ApiResponse<DoctorShift[]>>(`/api/doctors/${id}/shifts`)
  }

  async updateDoctorShifts(id: string, shifts: DoctorShift[]): Promise<ApiResponse<DoctorShift[]>> {
    return apiClient.put<ApiResponse<DoctorShift[]>>(`/api/doctors/${id}/shifts`, { shifts })
  }

  async getDoctorsBySpecialty(specialtyId: string): Promise<ApiResponse<Doctor[]>> {
    return apiClient.get<ApiResponse<Doctor[]>>("/api/doctors", {
      specialtyId,
    });
  }

}

export const doctorService = new DoctorService()
