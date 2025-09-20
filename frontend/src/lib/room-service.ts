import { apiClient } from "@/lib/api"
import type { Room, ApiResponse, PaginatedResponse } from "@/lib/types"

export class RoomService {
  async getRooms(page = 1, size = 10): Promise<PaginatedResponse<Room>> {
    const params = {
      page: page - 1, // Backend usa 0-based indexing
      size,
    }
    return apiClient.get<PaginatedResponse<Room>>("/api/rooms/paginated", params)
  }

  async getRoom(id: string): Promise<ApiResponse<Room>> {
    return apiClient.get<ApiResponse<Room>>(`/api/rooms/${id}`)
  }

  async createRoom(room: Omit<Room, "id" | "createdAt" | "updatedAt" | "isActive" | "hospital">): Promise<ApiResponse<Room>> {
    return apiClient.post<ApiResponse<Room>>("/api/rooms", room)
  }

  async updateRoom(id: string, room: Partial<Room>): Promise<ApiResponse<Room>> {
    return apiClient.put<ApiResponse<Room>>(`/api/rooms/${id}`, room)
  }

  async deleteRoom(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<ApiResponse<void>>(`/api/rooms/${id}`)
  }

  async getRoomsByHospital(hospitalId: string): Promise<ApiResponse<Room[]>> {
    return apiClient.get<ApiResponse<Room[]>>(`/api/rooms`, { hospitalId })
  }
}

export const roomService = new RoomService()