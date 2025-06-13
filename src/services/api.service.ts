import axios from 'axios';
import { API_CONFIG } from '../config/api.config';

class ApiService {
    private api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: API_CONFIG.BASE_URL,
            timeout: API_CONFIG.TIMEOUT,
            headers: API_CONFIG.HEADERS
        });

        // Optional request interceptor to handle auth.
        // TODO: implement once merged with Firebase code.
        this.api.interceptors.request.use(
            (config) => config,
            (error: AxiosError) => Promise.reject(error);
        );

        this.api.interceptors.response.use(
            (response: AxiosResponse) => response,
            (error: AxiosError) => {
                if (error.response?.status === 401) {
                    console.warn('Unauthorized: redirecting to login');
                }
                return Promise.reject(error);
            }
        );
    }

    async get<T>(endpoint: string, params?: object): Promise<T> {
        try {
            const response = await this.api.get<T>(endpoint, { params });
            return response.data;
        } catch (error) {
            this.handleError(error as AxiosError);
            throw error;
        }
    }

    async post<T>(endpoint: string, data: any): Promise<T> {
        try {
            const response = await this.api.post<T>(endpoint, data);
            return response.data;
        } catch (error) {
            this.handleError(error as AxiosError);
            throw error;
        }
    }

    async put<T>(endpoint: string, data: any): Promise<T> {
		try {
			const response = await this.api.put<T>(endpoint, data);
			return response.data;
		} catch (error) {
			this.handleError(error as AxiosError);
			throw error;
		}
	}

	async delete<T>(endpoint: string): Promise<T> {
		try {
			const response = await this.api.delete<T>(endpoint);
			return response.data;
		} catch (error) {
			this.handleError(error as AxiosError);
			throw error;
		}
	}

    private handleError(error: AxiosError) {
        if (error.response) {
            console.error('API Error:', error.response.data);
            console.error('Status:', error.response.status);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error:', error.message);
        }
    }
}

export const apiService = newApiService();
