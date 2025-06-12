import { getIdToken } from './auth.service';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || '';

interface FetchOptions extends RequestInit {
    params?: Record<string, string>;
}

// Define the HeadersInit type if it's not available
type Headers = Record<string, string>;

class ApiService {
    private async getHeaders(contentType?: string): Promise<Headers> {
        // Get the authentication token
        const token = await getIdToken();

        // Start with empty headers
        const headers: Headers = {};

        // Only set Content-Type if it's provided and not undefined
        if (contentType !== undefined) {
            headers['Content-Type'] = contentType;
        }

        // Add auth token if available (always do this regardless of content type)
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        return headers;
    }

    private buildUrl(endpoint: string, params?: Record<string, string>): string {
        // Use a full URL for React Native compatibility
        let baseUrl = API_BASE_URL;
        if (!baseUrl.endsWith('/') && !endpoint.startsWith('/')) {
            baseUrl += '/';
        }

        const fullUrl = `${baseUrl}${endpoint}`;

        // Handle URL params without using URL constructor (for React Native compatibility)
        if (!params || Object.keys(params).length === 0) {
            return fullUrl;
        }

        const queryString = Object.entries(params)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');

        return fullUrl.includes('?')
            ? `${fullUrl}&${queryString}`
            : `${fullUrl}?${queryString}`;
    }

    async get<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
        const { params, ...fetchOptions } = options;
        const url = this.buildUrl(endpoint, params);

        const response = await fetch(url, {
            method: 'GET',
            headers: await this.getHeaders(),
            ...fetchOptions,
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        return response.json();
    }

    async post<T>(endpoint: string, data: any, options: FetchOptions = {}): Promise<T> {
        const { params, ...fetchOptions } = options;
        const url = this.buildUrl(endpoint, params);

        const isFormData = data instanceof FormData;

        // For FormData, we explicitly pass undefined for contentType
        // This means "don't set a Content-Type header" but we STILL get the Auth header
        const headers = await this.getHeaders(isFormData ? undefined : 'application/json');

        // The above will give us:
        // FormData: { 'Authorization': 'Bearer xyz' }  // No Content-Type
        // JSON: { 'Content-Type': 'application/json', 'Authorization': 'Bearer xyz' }

        const body = isFormData ? data : JSON.stringify(data);

        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: body,
            ...fetchOptions,
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        return response.json();
    }
    async put<T>(endpoint: string, data: any, options: FetchOptions = {}): Promise<T> {
        const { params, ...fetchOptions } = options;
        const url = this.buildUrl(endpoint, params);

        const response = await fetch(url, {
            method: 'PUT',
            headers: await this.getHeaders(),
            body: JSON.stringify(data),
            ...fetchOptions,
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        return response.json();
    }

    async delete<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
        const { params, ...fetchOptions } = options;
        const url = this.buildUrl(endpoint, params);

        const response = await fetch(url, {
            method: 'DELETE',
            headers: await this.getHeaders(),
            ...fetchOptions,
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        return response.json();
    }
}

export const api = new ApiService();