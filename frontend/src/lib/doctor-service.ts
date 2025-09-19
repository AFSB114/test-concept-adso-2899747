import { apiClient } from "@/lib/api"
import type { Doctor, DoctorShift, DoctorFilters, PaginatedResponse, ApiResponse } from "@/lib/types"

export class DoctorService {
  async getDoctors(page = 1, size = 10, filters?: DoctorFilters): Promise<PaginatedResponse<Doctor>> {
    const params = {
      page: page - 1, // Backend usa 0-based indexing
      size,
      ...filters,
    }
    return apiClient.get<PaginatedResponse<Doctor>>("/doctors/paginated", params)
  }

  async getDoctor(id: string): Promise<ApiResponse<Doctor>> {
    return apiClient.get<ApiResponse<Doctor>>(`/doctors/${id}`)
  }

  async createDoctor(doctor: Omit<Doctor, "id" | "createdAt" | "updatedAt" | "isActive">): Promise<ApiResponse<Doctor>> {
    const requestData = {
      name: doctor.name,
      lastName: doctor.lastName,
      specialtyId: doctor.specialtyId,
      phone: doctor.phone,
      email: doctor.email,
      userId: doctor.userId
    }
    return apiClient.post<ApiResponse<Doctor>>("/doctors", requestData)
  }

  async updateDoctor(id: string, doctor: Partial<Doctor>): Promise<ApiResponse<Doctor>> {
    const requestData = {
      name: doctor.name,
      lastName: doctor.lastName,
      specialtyId: doctor.specialtyId,
      phone: doctor.phone,
      email: doctor.email,
      userId: doctor.userId
    }
    return apiClient.put<ApiResponse<Doctor>>(`/doctors/${id}`, requestData)
  }

  async deleteDoctor(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<ApiResponse<void>>(`/doctors/${id}`)
  }

  async getDoctorShifts(id: string): Promise<ApiResponse<DoctorShift[]>> {
    return apiClient.get<ApiResponse<DoctorShift[]>>(`/doctors/${id}/shifts`)
  }

  async updateDoctorShifts(id: string, shifts: DoctorShift[]): Promise<ApiResponse<DoctorShift[]>> {
    return apiClient.put<ApiResponse<DoctorShift[]>>(`/doctors/${id}/shifts`, { shifts })
  }

  async getDoctorsBySpecialty(specialtyId: string): Promise<ApiResponse<Doctor[]>> {
    return apiClient.get<ApiResponse<Doctor[]>>("/doctors", { specialtyId })
  }

}

export const doctorService = new DoctorService()
