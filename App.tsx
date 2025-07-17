import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { NavigationProvider } from './src/context/NavigationContext';
import ItemDetails from './src/screens/ItemDetails';
import CustomizationScreen from './src/screens/customization/CustomizationScreen';
import { RootStackParamList, LoginScreenNavigationProp } from './src/types/navigation';
import { ThemeProvider } from './src/theme/ThemeContext';
import { CustomizationProvider } from './src/context/CustomizationContext';
import BodyScanScreen from './src/screens/BodyScanScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import { CartProvider } from './src/context/CartContext';
import CheckoutScreen from './src/screens/CheckoutScreen';
import ManualMeasurementInput from './src/screens/ManualMeasurementInput';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import RegisterScreen from './src/screens/RegisterScreen';
import LoginScreen from './src/screens/LoginScreen';
import AccountScreen from './src/screens/AccountScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

interface ProtectedBodyScanScreenProps {
  navigation: LoginScreenNavigationProp;
}

// TODO: When rewriting, add Auth back into the navigation for measurement.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ProtectedBodyScanScreen({ navigation }: ProtectedBodyScanScreenProps) {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigation.navigate('Login');
    }
  }, [isAuthenticated, navigation]);

  return isAuthenticated ? <BodyScanScreen /> : null;
}

function AppContent() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name='Main' component={BottomTabNavigator} />
        <Stack.Screen name='Login' component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name='Register' component={RegisterScreen} options={{ title: 'Register' }} />
        <Stack.Screen name='Account' component={AccountScreen} options={{ title: 'Account' }} />
        <Stack.Screen
          name='ItemDetails'
          component={ItemDetails}
          options={{ title: 'Item Details' }}
        />
        <Stack.Screen name='BodyScan' component={BodyScanScreen} options={{ title: 'Body Scan' }} />
        <Stack.Screen name='Payment' component={PaymentScreen} options={{ title: 'Payment' }} />
        <Stack.Screen
          name='Customization'
          component={CustomizationScreen}
          options={{ title: 'Customization' }}
        />
        <Stack.Screen name='Checkout' component={CheckoutScreen} options={{ title: 'Checkout' }} />
        <Stack.Screen
          name='ManualMeasurementInput'
          component={ManualMeasurementInput}
          options={{ title: 'Manual Measurement' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <CustomizationProvider>
              <NavigationProvider>
                <AppContent />
              </NavigationProvider>
            </CustomizationProvider>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
