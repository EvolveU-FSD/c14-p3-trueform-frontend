// App.tsx
import React, { useEffect } from 'react';
import { NavigationContainer, LinkingOptions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuth } from './src/context/AuthContext'; // This is the correct import
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

const Stack = createNativeStackNavigator<RootStackParamList>();

// Custom linking configuration to prevent query parameters
const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['http://localhost:19006'],
  config: {
    screens: {
      Home: '',
      Items: 'items/:slug',
      ItemDetails: 'item/:itemId',
      Customization: 'item/:itemId/customize',
      CustomizationOption: 'item/:itemId/customize/:category',
      BodyScan: 'bodyscan',
      Login: 'login',
      Register: 'register',
      BodyScan: 'bodyscan',
      Payment: 'payment',
    },
  },
};

interface ProtectedBodyScanScreenProps {
  navigation: LoginScreenNavigationProp;
}

function ProtectedBodyScanScreen({ navigation }: ProtectedBodyScanScreenProps) {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      navigation.navigate('Login');
    }
  }, [isAuthenticated, navigation]);

  // Only render the BodyScanScreen if authenticated
  return isAuthenticated ? <BodyScanScreen /> : null;
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

function AppContent() {
  const { loading } = useAuth();

  if (loading) {
    // Return a loading screen if needed
    return null;
  }

  return (
    <ThemeProvider>
      <CustomizationProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Home'>
            {/* Public screens */}
            <Stack.Screen
              name='Home'
              component={HomeScreen}
              options={{ title: 'Home', headerShown: false }}
            />
            <Stack.Screen
              name='Category'
              component={CategoryScreen}
              options={({ route }: { route: CategoryScreenRouteProp }) => ({
                title: route.params.slug,
                headerShown: false,
              })}
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
          </Stack.Navigator>
        </NavigationContainer>
      </CustomizationProvider>
    </ThemeProvider>
  );
}
