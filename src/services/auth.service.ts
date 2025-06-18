// src/services/auth.service.ts
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
  getIdToken as firebaseGetIdToken,
} from 'firebase/auth';
import { auth } from '../config/firebase';

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
    return userCredential.user;
  } catch (error) {
    console.error('Login failed:', error);
    if (typeof error === 'object' && error !== null && 'code' in error) {
      const errorCode = (error as { code: string }).code;
      if (errorCode === 'auth/user-not-found') {
        throw new Error('No account found with this email');
      } else if (errorCode === 'auth/wrong-password') {
        throw new Error('Incorrect password');
      }
    }
    throw error;
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

  return await firebaseGetIdToken(user, true); // force refresh
}
