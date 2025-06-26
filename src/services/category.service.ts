import { API_CONFIG } from '../config/api.config';
import { ApiResponse } from '../types/api';
import { Category, CreateCategoryDTO, UpdateCategoryDTO } from '../types/category';
import { apiService } from './api.service';

export class CategoryService {
  private static readonly endpoint = API_CONFIG.ENDPOINTS.CATEGORIES;

  static async getAll(): Promise<Category[]> {
    try {
      const response = await apiService.get<Category[]>(this.endpoint);
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      return [];
    }
  }

  static async getById(id: string): Promise<Category | null> {
    try {
      const response = await apiService.get<Category>(`${this.endpoint}/${id}`);
      return response.data ?? null;
    } catch (error) {
      console.error(`Failed to fetch category with ID ${id}:`, error);
      return null;
    }
  }

  static async getBySlug(slug: string): Promise<Category | null> {
    try {
      const response = await apiService.get<Category>(`${this.endpoint}/slug/${slug}`);
      if (response.data && typeof response.data === 'object') {
        return response.data;
      }
      console.warn(`Unexpected response structure for getBySlug:`, response);
      return null;
    } catch (error) {
      console.error(`Failed to fetch category with slug ${slug}:`, error);
      return null;
    }
  }

  static async create(data: CreateCategoryDTO): Promise<Category | null> {
    try {
      const response = await apiService.post<Category, CreateCategoryDTO>(this.endpoint, data);
      return response.data ?? null;
    } catch (error) {
      console.error('Failed to create category:', error);
      return null;
    }
  }

  static async update(id: string, data: UpdateCategoryDTO): Promise<Category | null> {
    try {
      const response = await apiService.put<Category, UpdateCategoryDTO>(
        `${this.endpoint}/${id}`,
        data,
      );
      return response.data ?? null;
    } catch (error) {
      console.error(`Failed to update category with ID ${id}:`, error);
      return null;
    }
  }

  static async delete(id: string): Promise<boolean> {
    try {
      await apiService.delete<ApiResponse<void>>(`${this.endpoint}/${id}`);
      return true;
    } catch (error) {
      console.error(`Failed to delete category with ID ${id}:`, error);
      return false;
    }
  }
}
