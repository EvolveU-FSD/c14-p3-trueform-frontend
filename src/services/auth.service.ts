// src/services/auth.service.ts
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { auth } from '../config/firebase';
import { CustomerService } from './customer.service';

export async function signUp(email: string, password: string): Promise<User> {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    // Log the error
    console.error('Failed to create user:', error);

    // Transform or add context to the error
    if (error instanceof Error) {
      throw new Error(`Failed to create user account: ${error.message}`);
    } else {
      throw new Error('Failed to create user account: Unknown error');
    }
  }
}

export async function signIn(email: string, password: string): Promise<User> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    // Update last login in the database
    if (userCredential.user) {
      await CustomerService.updateLastLogin(userCredential.user.uid);
    }

    return userCredential.user;
  } catch (error: any) {
    console.error('Login failed:', error);
    if (error.code) {
      if (error.code === 'auth/user-not-found') {
        throw new Error('No account found with this email');
      } else if (error.code === 'auth/wrong-password') {
        throw new Error('Incorrect password');
      } else if (error.code === 'auth/invalid-email') {
        throw new Error('Invalid email format');
      } else if (error.code === 'auth/too-many-requests') {
        throw new Error('Too many failed login attempts. Please try again later.');
      }
    }
    throw new Error('Login failed: ' + (error.message || 'Unknown error'));
  }
}

export async function signOut(): Promise<void> {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Sign out failed:', error);
    // Maybe show a user-friendly error message
    throw new Error('Failed to sign out. Please try again.');
  }
}

export function getCurrentUser(): User | null {
  return auth.currentUser;
}

export function onAuthStateChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

export async function getIdToken(): Promise<string | null> {
  const user = auth.currentUser;
  if (!user) return null;

  try {
    return await user.getIdToken(true); // force refresh
  } catch (error) {
    console.error('Error getting ID token:', error);
    return null;
  }
}
