// src/services/auth.service.ts
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

export async function signUp(email: string, password: string): Promise<FirebaseAuthTypes.User> {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(email, password);
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

export async function signIn(email: string, password: string): Promise<FirebaseAuthTypes.User> {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(email, password);
    return userCredential.user;
  } catch (error: any) {
    console.error('Login failed:', error);
    if (error.code) {
      if (error.code === 'auth/user-not-found') {
        throw new Error('No account found with this email');
      } else if (error.code === 'auth/wrong-password') {
        throw new Error('Incorrect password');
      }
    }
    throw error;
  }
}

export async function signOut(): Promise<void> {
  try {
    await auth().signOut();
  } catch (error) {
    console.error('Sign out failed:', error);
    // Maybe show a user-friendly error message
    throw new Error('Failed to sign out. Please try again.');
  }
}

export function getCurrentUser(): FirebaseAuthTypes.User | null {
  return auth().currentUser;
}

export function onAuthStateChange(callback: (user: FirebaseAuthTypes.User | null) => void) {
  return auth().onAuthStateChanged(callback);
}

export async function getIdToken(): Promise<string | null> {
  const user = auth().currentUser;
  if (!user) return null;

  return await user.getIdToken(true); // force refresh
}
