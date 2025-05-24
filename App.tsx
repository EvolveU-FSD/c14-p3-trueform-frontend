// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import CategoryScreen from './src/screens/Category';
import { RootStackParamList } from './src/types/navigation';
import { ThemeProvider } from './src/theme/ThemeContext';

const Stack = createNativeStackNavigator<RootStackParamList>();

// Define linking configuration
const linking = {
  prefixes: ['http://localhost:19006'],
  config: {
    screens: {
      Home: 'home',
      Category: 'category/:categoryId',
    },
  },
  // This helps with initial URL handling
  enabled: true,
};

const App: React.FC = () => {
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
              title: route.params.categoryName,
              headerShown: false
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
