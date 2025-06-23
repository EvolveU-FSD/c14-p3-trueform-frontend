// Re-export all auth service functions for easier imports
export {
  signUp,
  signIn,
  signOut,
  getCurrentUser,
  onAuthStateChange,
  getIdToken,
} from './auth.service';

// Export API service
export { api } from './api.service';
