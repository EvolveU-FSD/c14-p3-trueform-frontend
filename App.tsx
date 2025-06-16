// App.tsx
import React from 'react';
import { NavigationContainer, LinkingOptions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import HomeScreen from './src/screens/HomeScreen';
import CategoryScreen from './src/screens/Category';
import {
  RootStackParamList,
  LoginScreenNavigationProp,
  CategoryScreenRouteProp
} from './src/types/navigation';
import { ThemeProvider } from './src/theme/ThemeContext';
import BodyScanScreen from './src/screens/BodyScanScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

// Custom linking configuration to prevent query parameters
const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['http://localhost:19006', 'myapp://'],
  config: {
    screens: {
      Home: '',
      Category: {
        path: 'category/:slug',
        parse: {
          slug: (slug: string) => slug,
        },
      },
      Login: 'login',
      Register: 'register',
      BodyScan: 'bodyscan',
    },
  },
  enabled: true,
};

interface ProtectedBodyScanScreenProps {
  navigation: LoginScreenNavigationProp;
}

function ProtectedBodyScanScreen({ navigation }: ProtectedBodyScanScreenProps) {
  const { isAuthenticated } = useAuth();

  React.useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      navigation.navigate('Login');
    }
  }, [isAuthenticated, navigation]);

  // Only render the BodyScanScreen if authenticated
  return isAuthenticated ? <BodyScanScreen /> : null;
}

function AppNavigator() {
  const { loading } = useAuth();

  if (loading) {
    // Return a loading screen if needed
    return null;
  }

  return (
    <Stack.Navigator initialRouteName="Home">
      {/* Public screens */}
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Home', headerShown: false }}
      />
      <Stack.Screen
        name="Category"
        component={CategoryScreen}
        options={({ route }: { route: CategoryScreenRouteProp }) => ({
          title: route.params.slug,
          headerShown: false
        })}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />

      {/* Protected screen */}
      <Stack.Screen
        name="BodyScan"
        component={ProtectedBodyScanScreen}
        options={{ title: 'Body Measurements' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <ThemeProvider>
<<<<<<< HEAD
      <AuthProvider>
        <NavigationContainer linking={linking}>
          <AppNavigator />
        </NavigationContainer>
      </AuthProvider>
    </ThemeProvider>
  );
}
=======
      <NavigationContainer linking={linking}>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen
            name='Home'
            component={HomeScreen}
            options={{ title: 'Home', headerShown: false }}
          />
          <Stack.Screen
            name='Category'
            component={CategoryScreen}
            options={({ route }) => ({
              title: route.params.slug,
              headerShown: false,
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
>>>>>>> main
