import { API_CONFIG } from '../config/api.config';
import { Customer, CreateCustomerDTO, UpdateCustomerDTO } from '../types/customer';
import { ApiResponse } from '../types/api';
import { apiService } from './api.service';

export class CustomerService {
  private static readonly endpoint = API_CONFIG.ENDPOINTS.CUSTOMER; // Based on your router

  static async getAll(): Promise<Customer[]> {
    try {
      const response = await apiService.get<Customer[]>(this.endpoint);
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('Failed to fetch customers:', error);
      return [];
    }
  }

  static async getById(id: string): Promise<Customer | null> {
    try {
      const response = await apiService.get<Customer>(`${this.endpoint}/${id}`);
      return response.data ?? null;
    } catch (error) {
      console.error(`Failed to fetch customer with ID ${id}:`, error);
      return null;
    }
  }

  static async getByFirebaseUid(firebaseUid: string): Promise<Customer | null> {
    try {
      const response = await apiService.get<Customer>(`${this.endpoint}/firebase/${firebaseUid}`);
      return response.data ?? null;
    } catch (error) {
      console.error(`Failed to fetch customer with Firebase UID ${firebaseUid}:`, error);
      return null;
    }
  }

  static async create(data: CreateCustomerDTO): Promise<Customer | null> {
    try {
      const response = await apiService.post<Customer, CreateCustomerDTO>(this.endpoint, data);
      return response.data ?? null;
    } catch (error) {
      console.error('Failed to create customer:', error);
      return null;
    }
  }

  static async update(id: string, data: UpdateCustomerDTO): Promise<Customer | null> {
    try {
      const response = await apiService.put<Customer, UpdateCustomerDTO>(
        `${this.endpoint}/${id}`,
        data,
      );
      return response.data ?? null;
    } catch (error) {
      console.error(`Failed to update customer with ID ${id}:`, error);
      return null;
    }
  }

  static async delete(id: string): Promise<boolean> {
    try {
      await apiService.delete<ApiResponse<void>>(`${this.endpoint}/${id}`);
      return true;
    } catch (error) {
      console.error(`Failed to delete customer with ID ${id}:`, error);
      return false;
    }
  }

  static async updateLastLogin(firebaseUid: string): Promise<Customer | null> {
    try {
      const response = await apiService.put<Customer, UpdateCustomerDTO>(
        `${this.endpoint}/last-login/${firebaseUid}`,
        {},
      );
      return response.data ?? null;
    } catch (error) {
      console.error(`Failed to update last login for Firebase UID ${firebaseUid}:`, error);
      return null;
    }
  }
}
