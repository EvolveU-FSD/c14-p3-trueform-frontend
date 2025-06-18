import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { API_CONFIG } from '../config/api.config';
import { ApiResponse } from '../types/api';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      timeout: API_CONFIG.TIMEOUT,
      headers: API_CONFIG.HEADERS,
    });

    // Optional request interceptor to handle auth.
    // TODO: implement once merged with Firebase code.
    this.api.interceptors.request.use(
      (config) => config,
      (error: AxiosError) => Promise.reject(error),
    );

    this.api.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          console.warn('Unauthorized: redirecting to login');
        }
        return Promise.reject(error);
      },
    );
  }

  async get<T>(endpoint: string, params?: object): Promise<ApiResponse<T>> {
    try {
      const response = await this.api.get<ApiResponse<T>>(endpoint, { params });
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError);
      throw error;
    }
  }

  async post<T, D>(endpoint: string, data: D): Promise<ApiResponse<T>> {
    try {
      const response = await this.api.post<ApiResponse<T>>(endpoint, data);
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError);
      throw error;
    }
  }

  async put<T, D>(endpoint: string, data: D): Promise<ApiResponse<T>> {
    try {
      const response = await this.api.put<ApiResponse<T>>(endpoint, data);
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError);
      throw error;
    }
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await this.api.delete<ApiResponse<T>>(endpoint);
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError);
      throw error;
    }
  }

  private handleError(error: AxiosError) {
    if (error.response) {
      console.error('api error:', error.response.data);
      console.error('status:', error.response.status);
    } else if (error.request) {
      console.error('no response received:', error.request);
    } else {
      console.error('error:', error.message);
    }
  }
}

export const apiService = new ApiService();
