import { API_CONFIG } from '../config/api.config';
import { ApiResponse } from '../types/api';
import { Vendor, CreateVendorDTO, UpdateVendorDTO } from '../types/vendor';
import { apiService } from './api.service';

export class VendorService {
  private static readonly endpoint = API_CONFIG.ENDPOINTS.CLOTHING;

  static async getAll(): Promise<Vendor[]> {
    try {
      const response = await apiService.get<Vendor[]>(this.endpoint);
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('Failed to fetch vendors:', error);
      return [];
    }
  }

  static async getById(id: string): Promise<Vendor | null> {
    try {
      const response = await apiService.get<Vendor>(`${this.endpoint}/${id}`);
      return response.data ?? null;
    } catch (error) {
      console.error(`Failed to fetch vendor with ID ${id}:`, error);
      return null;
    }
  }

  static async create(data: CreateVendorDTO): Promise<Vendor | null> {
    try {
      const response = await apiService.post<Vendor, CreateVendorDTO>(this.endpoint, data);
      return response.data ?? null;
    } catch (error) {
      console.error('Failed to create vendor:', error);
      return null;
    }
  }

  static async update(id: string, data: UpdateVendorDTO): Promise<Vendor | null> {
    try {
      const response = await apiService.put<Vendor, UpdateVendorDTO>(
        `${this.endpoint}/${id}`,
        data,
      );
      return response.data ?? null;
    } catch (error) {
      console.error(`Failed to update vendor with ID ${id}:`, error);
      return null;
    }
  }

  static async delete(id: string): Promise<boolean> {
    try {
      await apiService.delete<ApiResponse<void>>(`${this.endpoint}/${id}`);
      return true;
    } catch (error) {
      console.error(`Failed to delete vendor with ID ${id}:`, error);
      return false;
    }
  }
}
