import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;
  Login: { email?: string } | undefined;
  Register: undefined;
  ItemDetails: { itemId: string };
  Items: { slug: string };
  Category: { slug: string };
  BodyScan: undefined;
  Cart: undefined;
  Checkout: undefined; // Add Checkout to the navigation types
  Payment: undefined;
  Customization: { itemId: string };
  ManualMeasurementInput: undefined;
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
export type CheckoutScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Checkout'
>; // Add navigation prop type for Checkout

// Route prop types
export type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;
export type ItemDetailsScreenRouteProp = RouteProp<RootStackParamList, 'ItemDetails'>;
export type BodyScanScreenRouteProp = RouteProp<RootStackParamList, 'BodyScan'>;
export type LoginScreenRouteProp = RouteProp<RootStackParamList, 'Login'>;
export type RegisterScreenRouteProp = RouteProp<RootStackParamList, 'Register'>;
export type PaymentScreenRouteProp = RouteProp<RootStackParamList, 'Payment'>;
export type CheckoutScreenRouteProp = RouteProp<RootStackParamList, 'Checkout'>; // Add route prop type for Checkout

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

export interface CheckoutScreenProps {
  // Add screen props interface for Checkout
  navigation: CheckoutScreenNavigationProp;
  route: CheckoutScreenRouteProp;
}
