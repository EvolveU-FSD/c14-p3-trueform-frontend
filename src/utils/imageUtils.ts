// src/utils/imageUtils.ts
import { Platform } from 'react-native';

/**
 * Processes an image source to ensure compatibility across platforms
 * 
 * @param source - Can be a require() result, a URI string, or an object with uri property
 * @returns Properly formatted image source for the current platform
 */
export function processImageSource(source: any): any {
  // If null or undefined, return null
  if (source == null) {
    return null;
  }
  
  // Already in correct format for native (number from require or object with uri)
  if (typeof source === 'number' || (typeof source === 'object' && source.uri)) {
    return source;
  }
  
  // Handle string URI
  if (typeof source === 'string') {
    return { uri: source };
  }
  
  // Fallback - return as is
  return source;
}

/**
 * Helper to determine if we're running on web
 */
export const isWeb = Platform.OS === 'web';