import { apiClient } from "@/lib/api"
import type { Hospital, ApiResponse, PaginatedResponse } from "@/lib/types"

export class HospitalService {
  async getHospitals(page = 1, size = 10): Promise<PaginatedResponse<Hospital>> {
    const params = {
      page: page - 1, // Backend usa 0-based indexing
      size,
    }
    return apiClient.get<PaginatedResponse<Hospital>>("/api/hospitals/paginated", params)
  }

  async getHospital(id: string): Promise<ApiResponse<Hospital>> {
    return apiClient.get<ApiResponse<Hospital>>(`/api/hospitals/${id}`)
  }

  async createHospital(hospital: Omit<Hospital, "id" | "createdAt" | "updatedAt" | "isActive">): Promise<ApiResponse<Hospital>> {
    return apiClient.post<ApiResponse<Hospital>>("/api/hospitals", hospital)
  }

  async updateHospital(id: string, hospital: Partial<Hospital>): Promise<ApiResponse<Hospital>> {
    return apiClient.put<ApiResponse<Hospital>>(`/api/hospitals/${id}`, hospital)
  }

  async deleteHospital(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<ApiResponse<void>>(`/api/hospitals/${id}`)
  }
}

export const hospitalService = new HospitalService()