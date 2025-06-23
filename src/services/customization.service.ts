import { API_CONFIG } from '../config/api.config';
import { apiService } from './api.service';
import { CustomizationCategory, CustomizationOption } from '../types/customization';

export class CustomizationService {
  private static readonly endpoint = API_CONFIG.ENDPOINTS.CUSTOMIZATION;

  static async getCategories(productType: string): Promise<CustomizationCategory[]> {
    try {
      const response = await apiService.get<CustomizationCategory[]>(
        `${this.endpoint}/categories/${productType}`,
      );
      return response.data ? response.data.sort((a, b) => a.sortOrder - b.sortOrder) : [];
    } catch (error) {
      console.error('Failed to fetch customization categories:', error);
      return [];
    }
  }

  static async getOptionsByCategory(
    category: string,
    productType: string,
  ): Promise<CustomizationOption[]> {
    try {
      const response = await apiService.get<CustomizationOption[]>(
        `${this.endpoint}/options/${category}/${productType}`,
      );
      return response.data || [];
    } catch (error) {
      console.error('Failed to fetch customization options:', error);
      return [];
    }
  }
}
