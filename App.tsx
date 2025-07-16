import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { NavigationProvider } from './src/context/NavigationContext';
import HomeScreen from './src/screens/HomeScreen';
import ItemDetails from './src/screens/ItemDetails';
import CustomizationScreen from './src/screens/customization/CustomizationScreen';
import { RootStackParamList, LoginScreenNavigationProp } from './src/types/navigation';
import { ThemeProvider } from './src/theme/ThemeContext';
import { CustomizationProvider } from './src/context/CustomizationContext';
import Items from './src/screens/Items';
import BodyScanScreen from './src/screens/BodyScanScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import Cart from './src/screens/Cart';
import { CartProvider } from './src/context/CartContext';
import CheckoutScreen from './src/screens/CheckoutScreen';
import ManualMeasurementInput from './src/screens/ManualMeasurementInput';
import BottomNavBar from './src/components/navigation/BottomNavBar';

const Stack = createNativeStackNavigator<RootStackParamList>();

interface ProtectedBodyScanScreenProps {
  navigation: LoginScreenNavigationProp;
}

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
  const { loading } = useAuth();

  if (loading) {
    return null;
  }

  return (
    <NavigationContainer>
      <View style={{ flex: 1 }}>
        <Stack.Navigator initialRouteName='Home'>
          {/* Public screens */}
          <Stack.Screen
            name='Home'
            component={HomeScreen}
            options={{ title: 'Home', headerShown: false }}
          />
          <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen
            name='Register'
            component={RegisterScreen}
            options={{ headerShown: false }}
          />

          {/* Protected screens */}
          <Stack.Screen
            name='BodyScan'
            component={ProtectedBodyScanScreen}
            options={{ title: 'Automatic Body Measurements' }}
          />
          <Stack.Screen name='Payment' component={PaymentScreen} options={{ title: 'Payment' }} />
          <Stack.Screen
            name='Checkout'
            component={CheckoutScreen}
            options={{ title: 'Checkout' }}
          />
          <Stack.Screen
            name='ItemDetails'
            component={ItemDetails}
            options={{ title: 'Item Details' }}
          />
          <Stack.Screen name='Items' component={Items} options={{ title: 'Items' }} />
          <Stack.Screen
            name='Customization'
            component={CustomizationScreen}
            options={{ title: 'Customize Your Shirt' }}
          />
          <Stack.Screen name='Cart' component={Cart} options={{ title: 'Cart' }} />
          <Stack.Screen
            name='ManualMeasurementInput'
            component={ManualMeasurementInput}
            options={{ title: 'Manual Measurement Input' }}
          />
        </Stack.Navigator>

        {/* Global Bottom Navigation - Now INSIDE NavigationContainer */}
        <BottomNavBar />
      </View>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NavigationProvider>
          <CartProvider>
            <CustomizationProvider>
              <AppContent />
            </CustomizationProvider>
          </CartProvider>
        </NavigationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
