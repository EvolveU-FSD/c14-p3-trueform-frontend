// App.tsx
import React from 'react';
import { NavigationContainer, LinkingOptions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import CategoryScreen from './src/screens/Category';
import ItemDetails from './src/screens/ItemDetails';
import CustomizationScreen from './src/screens/customization/CustomizationScreen';
import CollarStyle from './src/screens/customization/CollarStyle';
import CuffStyle from './src/screens/customization/CuffStyle';
import PocketStyle from './src/screens/customization/PocketStyle';
import SleeveStyle from './src/screens/customization/SleeveStyle';
import ShirtLength from './src/screens/customization/ShirtLength';
import Monogram from './src/screens/customization/Monogram';
import Buttons from './src/screens/customization/Buttons';
import Measurement from './src/screens/customization/Measurement';
import { RootStackParamList } from './src/types/navigation';
import { ThemeProvider } from './src/theme/ThemeContext';
import { CustomizationProvider } from './src/context/CustomizationContext';

const Stack = createNativeStackNavigator<RootStackParamList>();

// Custom linking configuration to prevent query parameters
// App.tsx
const linking = {
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
    },
  },
  enabled: true,
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <CustomizationProvider>
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
            <Stack.Screen
              name="ItemDetails"
              component={ItemDetails}
              options={{ title: 'Item Details' }}
            />
            <Stack.Screen
              name="Customization"
              component={CustomizationScreen}
              options={{ title: 'Customize Your Shirt' }}
            />
            <Stack.Screen
              name="CollarStyle"
              component={CollarStyle}
              options={{ title: 'Select Collar Style' }}
            />
            <Stack.Screen
              name="CuffStyle"
              component={CuffStyle}
              options={{ title: 'Select Cuff Style' }}
            />
            <Stack.Screen
              name="PocketStyle"
              component={PocketStyle}
              options={{ title: 'Select Pocket Style' }}
            />
            <Stack.Screen
              name="SleeveStyle"
              component={SleeveStyle}
              options={{ title: 'Select Sleeve Style' }}
            />
            <Stack.Screen
              name="ShirtLength"
              component={ShirtLength}
              options={{ title: 'Select Shirt Length' }}
            />
            <Stack.Screen
              name="Monogram"
              component={Monogram}
              options={{ title: 'Select Monogram' }}
            />
            <Stack.Screen
              name="Buttons"
              component={Buttons}
              options={{ title: 'Select Buttons' }}
            />
            <Stack.Screen
              name="Measurement"
              component={Measurement}
              options={{ title: 'Select Measurement Type' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </CustomizationProvider>
    </ThemeProvider>
  );
};

export default App;