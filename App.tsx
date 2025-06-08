// App.tsx
import React from 'react';
import { NavigationContainer, LinkingOptions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import CategoryScreen from './src/screens/Category';
import { RootStackParamList } from './src/types/navigation';
import { ThemeProvider } from './src/theme/ThemeContext';
import  BodyScanScreen  from './src/screens/BodyScanScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

// Custom linking configuration to prevent query parameters
// App.tsx
const linking = {
  prefixes: ['http://localhost:19006','myapp://'],
  config: {
    screens: {
      Home: '',
      Category: {
        path: 'category/:slug',
        parse: {
          slug: (slug: string) => slug,
        },
      },
    },
  },
  enabled: true,
};

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer linking={linking}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Home', headerShown: false }}
          />
          <Stack.Screen
            name="Category"
            component={CategoryScreen}
            options={({ route }) => ({
              title: route.params.slug,
              headerShown: false
            })}
          />
          <Stack.Screen name="BodyScan" component={BodyScanScreen} options={{ title: 'Body Measurements' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};
