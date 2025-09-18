import { apiClient } from "@/lib/api"
import type { Patient, MedicalHistory, PatientFilters, PaginatedResponse, ApiResponse } from "@/lib/types"

export class PatientService {
  async getPatients(page = 1, size = 10, filters?: PatientFilters): Promise<PaginatedResponse<Patient>> {
    const params = {
      page: page - 1, // Backend usa 0-based indexing
      size,
      ...filters,
    }
    return apiClient.get<PaginatedResponse<Patient>>("/patients/paginated", params)
  }

  async getPatient(id: string): Promise<ApiResponse<Patient>> {
    return apiClient.get<ApiResponse<Patient>>(`/patients/${id}`)
  }

  async createPatient(patient: Omit<Patient, "id" | "createdAt" | "updatedAt">): Promise<ApiResponse<Patient>> {
    return apiClient.post<ApiResponse<Patient>>("/patients", patient)
  }

  async updatePatient(id: string, patient: Partial<Patient>): Promise<ApiResponse<Patient>> {
    return apiClient.put<ApiResponse<Patient>>(`/patients/${id}`, patient)
  }

  async deletePatient(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<ApiResponse<void>>(`/patients/${id}`)
  }

  async getPatientHistory(id: string): Promise<ApiResponse<MedicalHistory[]>> {
    return apiClient.get<ApiResponse<MedicalHistory[]>>(`/patients/${id}/history`)
  }

  async addMedicalHistory(
    patientId: string,
    history: Omit<MedicalHistory, "id" | "patientId">,
  ): Promise<ApiResponse<MedicalHistory>> {
    return apiClient.post<ApiResponse<MedicalHistory>>(`/patients/${patientId}/history`, history)
  }
}

export const patientService = new PatientService()
