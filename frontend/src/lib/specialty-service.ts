import { apiClient } from "@/lib/api"
import type { Specialty, ApiResponse } from "@/lib/types"

export class SpecialtyService {
  async getSpecialties(): Promise<ApiResponse<Specialty[]>> {
    return apiClient.get<ApiResponse<Specialty[]>>("/api/specialties");
  }

  async getSpecialty(id: string): Promise<ApiResponse<Specialty>> {
    return apiClient.get<ApiResponse<Specialty>>(`/api/specialties/${id}`);
  }

  async createSpecialty(specialty: Omit<Specialty, "id" | "isActive" | "createdAt" | "updatedAt">): Promise<ApiResponse<Specialty>> {
    const requestData = {
      name: specialty.name,
      description: specialty.description
    }
    return apiClient.post<ApiResponse<Specialty>>(
      "/api/specialties",
      requestData
    );
  }

  async updateSpecialty(id: string, specialty: Partial<Specialty>): Promise<ApiResponse<Specialty>> {
    const requestData = {
      name: specialty.name,
      description: specialty.description
    }
    return apiClient.put<ApiResponse<Specialty>>(
      `/api/specialties/${id}`,
      requestData
    );
  }

  async deleteSpecialty(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<ApiResponse<void>>(`/api/specialties/${id}`);
  }
}

export const specialtyService = new SpecialtyService()
