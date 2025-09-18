import { apiClient } from "@/lib/api"
import type { Specialty, ApiResponse } from "@/lib/types"

export class SpecialtyService {
  async getSpecialties(): Promise<ApiResponse<Specialty[]>> {
    return apiClient.get<ApiResponse<Specialty[]>>("/specialties")
  }

  async getSpecialty(id: string): Promise<ApiResponse<Specialty>> {
    return apiClient.get<ApiResponse<Specialty>>(`/specialties/${id}`)
  }

  async createSpecialty(specialty: Omit<Specialty, "id">): Promise<ApiResponse<Specialty>> {
    return apiClient.post<ApiResponse<Specialty>>("/specialties", specialty)
  }

  async updateSpecialty(id: string, specialty: Partial<Specialty>): Promise<ApiResponse<Specialty>> {
    return apiClient.put<ApiResponse<Specialty>>(`/specialties/${id}`, specialty)
  }

  async deleteSpecialty(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<ApiResponse<void>>(`/specialties/${id}`)
  }
}

export const specialtyService = new SpecialtyService()
