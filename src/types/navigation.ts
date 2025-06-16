// src/types/navigation.ts
import type { RouteProp } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Category: {
    slug: string; // Will contain the category ID
  };
<<<<<<< HEAD
  BodyScan: undefined;
  Login: { email?: string } | undefined;
  Register: undefined;
};

// Navigation prop types
export type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
export type CategoryScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Category'>;
export type BodyScanScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'BodyScan'>;
export type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;
export type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

// Route prop types
export type CategoryScreenRouteProp = RouteProp<RootStackParamList, 'Category'>;
export type BodyScanScreenRouteProp = RouteProp<RootStackParamList, 'BodyScan'>;
export type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;
export type LoginScreenRouteProp = RouteProp<RootStackParamList, 'Login'>;
export type RegisterScreenRouteProp = RouteProp<RootStackParamList, 'Register'>;
=======
};
>>>>>>> main
