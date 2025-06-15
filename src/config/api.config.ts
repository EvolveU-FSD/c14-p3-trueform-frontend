export const API_CONFIG = {
    BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:3000/api',
    ENDPOINTS: {
        CLOTHING: '/clothing',
        CATEGORIES: '/categories',
        VENDORS: '/vendor',
        CUSTOMERS: '/customer'
    },
    TIMEOUT: 10000,
    HEADERS: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
};