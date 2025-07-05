import { API_CONFIG } from '../config/api.config';
import { ApiResponse } from '../types/api';
import { Clothing, CreateClothingDTO, UpdateClothingDTO } from '../types/clothing';
import { apiService } from './api.service';

export class ClothingService {
  private static readonly endpoint = API_CONFIG.ENDPOINTS.CLOTHING;

  static async getAll(): Promise<Clothing[]> {
    try {
      const response = await apiService.get<Clothing[]>(this.endpoint);
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('Failed to fetch clothing items:', error);
      return [];
    }
  }

  static async getById(id: string): Promise<Clothing | null> {
    try {
      const response = await apiService.get<Clothing>(`${this.endpoint}/${id}`);
      return response.data ?? null;
    } catch (error) {
      console.error(`Failed to fetch clothing item with ID ${id}:`, error);
      return null;
    }
  }

  static async create(data: CreateClothingDTO): Promise<Clothing | null> {
    try {
      const response = await apiService.post<Clothing, CreateClothingDTO>(this.endpoint, data);
      return response.data ?? null;
    } catch (error) {
      console.error('Failed to create clothing item:', error);
      return null;
    }
  }

  static async update(id: string, data: UpdateClothingDTO): Promise<Clothing | null> {
    try {
      const response = await apiService.put<Clothing, UpdateClothingDTO>(
        `${this.endpoint}/${id}`,
        data,
      );
      return response.data ?? null;
    } catch (error) {
      console.error(`Failed to update clothing item with ID ${id}:`, error);
      return null;
    }
  }

  static async delete(id: string): Promise<boolean> {
    try {
      await apiService.delete<ApiResponse<void>>(`${this.endpoint}/${id}`);
      return true;
    } catch (error) {
      console.error(`Failed to delete clothing item with ID ${id}:`, error);
      return false;
    }
  }
}
