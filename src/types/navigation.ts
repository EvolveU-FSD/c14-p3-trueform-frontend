import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  Main: undefined;
  // Login related
  Account: undefined;
  Login: { email?: string };
  Register: undefined;
  // Shopping related.
  Items: undefined;
  ItemDetails: { itemId: string };
  Customization: { itemId: string };
  // Measurements related.
  Measure: undefined;
  BodyScan: undefined;
  ManualMeasurementInput: undefined;
  // Checkout related.
  Cart: undefined;
  Checkout: undefined;
  Payment: undefined;
  Confirmation: undefined;
};

export type BottomTabParamList = {
  Shop: { slug: string };
  Measure: undefined;
  Cart: undefined;
  Account: undefined;
};

// Stack Navigation prop types
export type MainScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Main'>;
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
>;
export type AccountScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Account'>;
export type ManualMeasurementInputNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ManualMeasurementInput'
>;

// Bottom Tab Navigation prop types
export type ShopTabNavigationProp = BottomTabNavigationProp<BottomTabParamList, 'Shop'>;
export type MeasureTabNavigationProp = BottomTabNavigationProp<BottomTabParamList, 'Measure'>;
export type CartTabNavigationProp = BottomTabNavigationProp<BottomTabParamList, 'Cart'>;
export type AccountTabNavigationProp = BottomTabNavigationProp<BottomTabParamList, 'Account'>;

// Route prop types
export type MainScreenRouteProp = RouteProp<RootStackParamList, 'Main'>;
export type ItemDetailsScreenRouteProp = RouteProp<RootStackParamList, 'ItemDetails'>;
export type BodyScanScreenRouteProp = RouteProp<RootStackParamList, 'BodyScan'>;
export type LoginScreenRouteProp = RouteProp<RootStackParamList, 'Login'>;
export type RegisterScreenRouteProp = RouteProp<RootStackParamList, 'Register'>;
export type PaymentScreenRouteProp = RouteProp<RootStackParamList, 'Payment'>;
export type CheckoutScreenRouteProp = RouteProp<RootStackParamList, 'Checkout'>;
export type AccountScreenRouteProp = RouteProp<RootStackParamList, 'Account'>;
export type ManualMeasurementInputRouteProp = RouteProp<
  RootStackParamList,
  'ManualMeasurementInput'
>;

// Bottom Tab Route prop types
export type MeasureTabRouteProp = RouteProp<BottomTabParamList, 'Measure'>;

// Screen props interfaces
export interface MainScreenProps {
  navigation: MainScreenNavigationProp;
  route: MainScreenRouteProp;
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
  navigation: CheckoutScreenNavigationProp;
  route: CheckoutScreenRouteProp;
}

export interface AccountScreenProps {
  navigation: AccountScreenNavigationProp;
  route: AccountScreenRouteProp;
}

export interface ManualMeasurementInputProps {
  navigation: ManualMeasurementInputNavigationProp;
  route: ManualMeasurementInputRouteProp;
}

// Bottom Tab Screen props interfaces
export interface MeasureTabProps {
  navigation: MeasureTabNavigationProp;
  route: MeasureTabRouteProp;
}

// Category screen navigation types
export type CategoryScreenNavigationProp = NativeStackNavigationProp<any, 'Category'>;
export type CategoryScreenRouteProp = RouteProp<any, 'Category'>;

export interface CategoryScreenProps {
  navigation: CategoryScreenNavigationProp;
}
