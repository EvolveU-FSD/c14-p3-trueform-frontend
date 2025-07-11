import { API_CONFIG } from '../config/api.config';
import { apiService } from './api.service';
import { Customization } from '../types/customization';

export class CustomizationService {
  private static readonly endpoint = API_CONFIG.ENDPOINTS.CUSTOMIZATION;

  static async getCustomizationsByCategoryId(categoryId: string): Promise<Customization[]> {
    try {
      const response = await apiService.get<Customization[]>(
        `${this.endpoint}/category/${categoryId}`,
      );

      if (response.data) {
        // Sort customizations by sortOrder
        return response.data.sort((a, b) => a.sortOrder - b.sortOrder);
      }

      return [];
    } catch (error) {
      console.error(`Failed to fetch customizations for ${categoryId}:`, error);
      return [];
    }
  }

  static async createCustomization(
    customization: Omit<Customization, 'id'>,
  ): Promise<Customization | null> {
    try {
      const response = await apiService.post<Customization>(this.endpoint, customization);
      return response.data || null;
    } catch (error) {
      console.error('Failed to create customization:', error);
      return null;
    }
  }

  // Helper method to get options for a specific customization type
  static getOptionsForType(customizations: Customization[], type: string): CustomizationOption[] {
    const customization = customizations.find((c) => c.type === type);
    return customization?.options.sort((a, b) => a.sortOrder - b.sortOrder) ?? [];
  }
}
