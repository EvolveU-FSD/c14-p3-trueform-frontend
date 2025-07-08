import { CustomizationOption } from './customization';
import type { RouteProp } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  ItemDetails: { itemId: string };
  Items: { slug: string };
  Customization: {
    itemId: string;
  };
  CustomizationOption: {
    itemId: string;
    category: string;
    options: CustomizationOption[];
  };
  BodyScan: undefined;
  Login: { email?: string } | undefined;
  Register: undefined;
  Payment: undefined;
  Cart: undefined;
};

// Navigation prop types
export type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
export type ItemDetailsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ItemDetails'
>;
export type BodyScanScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'BodyScan'
>;
export type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;
export type RegisterScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Register'
>;
export type PaymentScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Payment'>;

// Route prop types
export type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;
export type ItemDetailsScreenRouteProp = RouteProp<RootStackParamList, 'ItemDetails'>;
export type BodyScanScreenRouteProp = RouteProp<RootStackParamList, 'BodyScan'>;
export type LoginScreenRouteProp = RouteProp<RootStackParamList, 'Login'>;
export type RegisterScreenRouteProp = RouteProp<RootStackParamList, 'Register'>;
export type PaymentScreenRouteProp = RouteProp<RootStackParamList, 'Payment'>;

// Screen props interfaces
export interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
}

export interface ItemDetailsScreenProps {
  navigation: ItemDetailsScreenNavigationProp;
  route: ItemDetailsScreenRouteProp;
}

export interface BodyScanScreenProps {
  navigation: BodyScanScreenNavigationProp;
  route: BodyScanScreenRouteProp;
}

export interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
  route: LoginScreenRouteProp;
}

export interface RegisterScreenProps {
  navigation: RegisterScreenNavigationProp;
  route: RegisterScreenRouteProp;
}
