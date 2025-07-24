export const API_CONFIG = {
  BASE_URL: `${process.env.EXPO_PUBLIC_API_BASE_URL}/api` || 'https://localhost:3000/api',
  IMAGE_BASE_URL:
    `${process.env.EXPO_PUBLIC_API_BASE_URL}/images` || 'https://localhost:3000/images',
  ENDPOINTS: {
    ADDRESS: '/address',
    CATEGORIES: '/category',
    CLOTHING: '/clothing',
    CUSTOMER: '/customer',
    CUSTOMIZATION: '/customization',
    VENDORS: '/vendor',
    CUSTOMERS: '/customer',
    BODYSCAN: '/scan',
    MEASUREMENTS: '/measurement',
    ORDER: '/order',
    PAYMENT: '/payment',
  },
  TIMEOUT: 100000,
  HEADERS: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};
