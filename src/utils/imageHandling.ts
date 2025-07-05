import { API_CONFIG } from '../config/api.config';

export const getImageUrl = (imagePath: string | null | undefined): string => {
  if (!imagePath) {
    return 'https://localhost:3000/images/placeholder-image.jpg'; // Default placeholder image
  }

  // If the image path is already a full URL, return it as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  // Remove any leading slash to prevent double slashes in the URL
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;

  return `${API_CONFIG.IMAGE_BASE_URL}/${cleanPath}`;
};
