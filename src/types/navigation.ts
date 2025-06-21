import type { RouteProp } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Category: { slug: string };
  BodyScan: undefined;
  Login: { email?: string } | undefined;
  Register: undefined;
  ItemDetails: undefined;
  Customization: undefined;
  CollarStyle: undefined;
  CuffStyle: undefined;
  PocketStyle: undefined;
  SleeveStyle: undefined;
  ShirtLength: undefined;
  Monogram: undefined;
  Buttons: undefined;
  Measurement: undefined;
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

// Screen props interfaces
export interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

export interface CategoryScreenProps {
  navigation: CategoryScreenNavigationProp;
  route: CategoryScreenRouteProp;
}

export interface BodyScanScreenProps {
  navigation: BodyScanScreenNavigationProp;
}

export interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
  route: LoginScreenRouteProp;
}

export interface RegisterScreenProps {
  navigation: RegisterScreenNavigationProp;
}
