import { API_CONFIG } from '../config/api.config';
import { ApiResponse } from '../types/api';
import {
  Measurement,
  CreateMeasurementDTO,
  UpdateMeasurementDTO,
  CreateMeasurementFromScanDTO,
  MeasurementScanResponse,
} from '../types/measurement.types';
import { apiService } from './api.service';

export class MeasurementService {
  private static readonly endpoint = API_CONFIG.ENDPOINTS.MEASUREMENTS;

  static async getAll(): Promise<Measurement[]> {
    try {
      const response = await apiService.get<Measurement[]>(this.endpoint);
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('Failed to fetch measurements:', error);
      return [];
    }
  }

  static async getById(id: string): Promise<Measurement | null> {
    try {
      const response = await apiService.get<Measurement>(`${this.endpoint}/${id}`);
      return response.data ?? null;
    } catch (error) {
      console.error(`Failed to fetch measurement with ID ${id}:`, error);
      return null;
    }
  }

  static async getByCustomerId(customerId: string): Promise<Measurement[]> {
    try {
      const response = await apiService.get<Measurement[]>(
        `${this.endpoint}/customer/${customerId}`,
      );
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error(`Failed to fetch measurements for customer ${customerId}:`, error);
      return [];
    }
  }

  static async getByCustomerIdAndStandardType(
    customerId: string,
    standardType: string,
  ): Promise<Measurement[]> {
    try {
      const response = await apiService.get<Measurement[]>(
        `${this.endpoint}/customer/${customerId}/standard/${standardType}`,
      );
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error(
        `Failed to fetch measurements for customer ${customerId} with standard type ${standardType}:`,
        error,
      );
      return [];
    }
  }

  static async create(data: CreateMeasurementDTO): Promise<Measurement | null> {
    try {
      const response = await apiService.post<Measurement, CreateMeasurementDTO>(
        this.endpoint,
        data,
      );
      return response.data ?? null;
    } catch (error) {
      console.error('Failed to create measurement:', error);
      return null;
    }
  }

  static async createFromScan(
    data: CreateMeasurementFromScanDTO,
  ): Promise<MeasurementScanResponse | null> {
    try {
      const response = await apiService.post<MeasurementScanResponse, CreateMeasurementFromScanDTO>(
        `${this.endpoint}/scan`,
        data,
      );
      return response.data ?? null;
    } catch (error) {
      console.error('Failed to create measurement from scan:', error);
      return null;
    }
  }

  static async update(id: string, data: UpdateMeasurementDTO): Promise<Measurement | null> {
    try {
      const response = await apiService.put<Measurement, UpdateMeasurementDTO>(
        `${this.endpoint}/${id}`,
        data,
      );
      return response.data ?? null;
    } catch (error) {
      console.error(`Failed to update measurement with ID ${id}:`, error);
      return null;
    }
  }

  static async delete(id: string): Promise<boolean> {
    try {
      await apiService.delete<ApiResponse<void>>(`${this.endpoint}/${id}`);
      return true;
    } catch (error) {
      console.error(`Failed to delete measurement with ID ${id}:`, error);
      return false;
    }
  }
}
