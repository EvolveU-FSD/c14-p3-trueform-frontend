import { API_CONFIG } from "../config/api.config";
import { ApiResponse } from "../types/api";
import { Clothing, CreateClothingDTO } from "../types/clothing";
import { apiService } from "./api.service";

export class ClothingService {
    static async getAll(): Promise<PaginatedResponse<Clothing>> {
        return apiService.get<PaginatedResponse<Clothing>>(API_CONFIG.ENDPOINTS.CLOTHING);
    }

    static async create(data: CreateClothingDTO): Promise<ApiResponse<Clothing>> {
        return apiService.post<ApiResponse<Clothing>>(API_CONFIG.ENDPOINTS.CLOTHING, data);
    }
}
