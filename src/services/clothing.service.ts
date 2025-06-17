import { API_CONFIG } from '../config/api.config';
import { ApiResponse } from '../types/api';
import { Clothing, CreateClothingDTO, UpdateClothingDTO } from '../types/clothing';
import { apiService } from './api.service';

export class ClothingService {
  private static readonly endpoint = API_CONFIG.ENDPOINTS.CLOTHING;

  static async getAll(): Promise<Clothing[]> {
    return apiService.get<Clothing[]>(this.endpoint);
  }

  static async getById(id: string): Promise<ApiResponse<Clothing>> {
    return apiService.get<ApiResponse<Clothing>>(`${this.endpoint}/${id}`);
  }

  static async create(data: CreateClothingDTO): Promise<ApiResponse<Clothing>> {
    return apiService.post<ApiResponse<Clothing>>(this.endpoint, data);
  }

  static async update(id: string, data: UpdateClothingDTO): Promise<ApiResponse<Clothing>> {
    return apiService.put<ApiResponse<Clothing>>(`${this.endpoint}/${id}`, data);
  }

  static async delete(id: string): Promise<ApiResponse<void>> {
    return apiService.delete<ApiResponse<void>>(`${this.endpoint}/${id}`);
  }
}
