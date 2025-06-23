// App.tsx
import React from 'react';
import { NavigationContainer, LinkingOptions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import ItemDetails from './src/screens/ItemDetails';
import CustomizationScreen from './src/screens/customization/CustomizationScreen';
import CustomizationOptionScreen from './src/screens/customization/CustomizationOptionScreen';
import { RootStackParamList } from './src/types/navigation';
import { ThemeProvider } from './src/theme/ThemeContext';
import { CustomizationProvider } from './src/context/CustomizationContext';
import Items from './src/screens/Items';

const Stack = createNativeStackNavigator<RootStackParamList>();

// Custom linking configuration to prevent query parameters
const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['http://localhost:19006'],
  config: {
    screens: {
      Home: '',
      Category: {
        path: 'category/:slug',
        parse: {
          slug: (slug: string) => slug,
        },
      },
      ItemDetails: {
        path: 'item/:itemId',
        parse: {
          itemId: (id: string) => id,
        },
      },
      Customization: 'customize',
      CustomizationOption: {
        path: 'customize/:category',
        parse: {
          category: (category: string) => category,
        },
      },
    },
  },
  enabled: true,
};

export default function App() {
  return (
    <ThemeProvider>
      <CustomizationProvider>
        <NavigationContainer linking={linking}>
          <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen
              name='Home'
              component={HomeScreen}
              options={{ title: 'Home', headerShown: false }}
            />
            <Stack.Screen
              name='Category'
              component={Items}
              options={({ route }) => ({
                title: route.params.slug,
                headerShown: false,
              })}
            />
            <Stack.Screen
              name='ItemDetails'
              component={ItemDetails}
              options={{ title: 'Item Details' }}
            />
            <Stack.Screen
              name='Customization'
              component={CustomizationScreen}
              options={{ title: 'Customize Your Shirt' }}
            />
            <Stack.Screen
              name='CustomizationOption'
              component={CustomizationOptionScreen}
              options={({ route }) => ({
                title: `Select ${route.params.category}`,
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </CustomizationProvider>
    </ThemeProvider>
  );
}
