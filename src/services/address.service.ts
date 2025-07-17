import { API_CONFIG } from '../config/api.config';
import { ApiResponse } from '../types/api';
import { Address, CreateAddressDTO, UpdateAddressDTO } from '../types/address.types';
import { Customer } from '../types/customer';
import { apiService } from './api.service';

export class AddressService {
  private static readonly endpoint = API_CONFIG.ENDPOINTS.ADDRESS;

  static async getAll(): Promise<Address[]> {
    try {
      const response = await apiService.get<Address[]>(this.endpoint);
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('Failed to fetch addresses:', error);
      return [];
    }
  }

  static async getById(id: string): Promise<Address | null> {
    try {
      const response = await apiService.get<Address>(`${this.endpoint}/${id}`);
      return response.data ?? null;
    } catch (error) {
      console.error(`Failed to fetch address with ID ${id}:`, error);
      return null;
    }
  }

  static async getByCustomerId(customerId: string): Promise<Address[]> {
    try {
      const response = await apiService.get<Address[]>(`${this.endpoint}/customer/${customerId}`);
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error(`Failed to fetch addresses for customer ${customerId}:`, error);
      return [];
    }
  }

  static async create(data: CreateAddressDTO): Promise<Address | null> {
    try {
      const response = await apiService.post<Address, CreateAddressDTO>(this.endpoint, data);
      return response.data ?? null;
    } catch (error) {
      console.error('Failed to create address:', error);
      return null;
    }
  }

  static async update(id: string, data: UpdateAddressDTO): Promise<Address | null> {
    try {
      const response = await apiService.put<Address, UpdateAddressDTO>(
        `${this.endpoint}/${id}`,
        data,
      );
      return response.data ?? null;
    } catch (error) {
      console.error(`Failed to update address with ID ${id}:`, error);
      return null;
    }
  }

  static async delete(id: string): Promise<boolean> {
    try {
      await apiService.delete<ApiResponse<void>>(`${this.endpoint}/${id}`);
      return true;
    } catch (error) {
      console.error(`Failed to delete address with ID ${id}:`, error);
      return false;
    }
  }

  static async setDefaultBillingAddress(id: string): Promise<Customer | null> {
    try {
      const response = await apiService.put<Customer, Record<string, never>>(
        `${this.endpoint}/${id}/set-default-billing-address`,
        {},
      );
      return response.data ?? null;
    } catch (error) {
      console.error(`Failed to set default billing address with ID ${id}:`, error);
      return null;
    }
  }

  static async setDefaultShippingAddress(id: string): Promise<Customer | null> {
    try {
      const response = await apiService.put<Customer, Record<string, never>>(
        `${this.endpoint}/${id}/set-default-shipping-address`,
        {},
      );
      return response.data ?? null;
    } catch (error) {
      console.error(`Failed to set default shipping address with ID ${id}:`, error);
      return null;
    }
  }
}
