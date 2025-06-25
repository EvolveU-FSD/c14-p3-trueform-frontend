export const API_CONFIG = {
  BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL || 'https://localhost:3000/api',
  IMAGE_BASE_URL: 'https://localhost:3000/images',
  ENDPOINTS: {
    CATEGORIES: '/category',
    CLOTHING: '/clothing',
    CUSTOMIZATION: '/customization',
    VENDORS: '/vendor',
    CUSTOMERS: '/customer',
    BODYSCAN: `/scan`,
  },
  TIMEOUT: 10000,
  HEADERS: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};
