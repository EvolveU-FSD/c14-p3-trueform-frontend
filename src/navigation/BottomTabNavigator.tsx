import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import Items from '../screens/Items';
import BodyScanScreen from '../screens/BodyScanScreen';
import Cart from '../screens/Cart';
import LoginScreen from '../screens/LoginScreen';
import { useTheme } from '../theme/ThemeContext';
import createStyles from '../styles/BottomTabNavigatorStyles';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const { theme } = useTheme();
  const styles = createStyles();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: styles.tabBarStyle,
        tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarActiveTintColor: theme.primaryColor,
        tabBarInactiveTintColor: theme.secondaryColor,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name='Shop'
        component={Items}
        initialParams={{ slug: 'all' }}
        options={{
          tabBarIcon: ({ color }) => <Text style={[styles.tabBarIcon, { color }]}>🛍️</Text>,
        }}
      />
      <Tab.Screen
        name='Measure'
        component={BodyScanScreen}
        options={{
          tabBarIcon: ({ color }) => <Text style={[styles.tabBarIcon, { color }]}>📏</Text>,
        }}
      />
      <Tab.Screen
        name='Cart'
        component={Cart}
        options={{
          tabBarIcon: ({ color }) => <Text style={[styles.tabBarIcon, { color }]}>🛒</Text>,
        }}
      />
      <Tab.Screen
        name='Account'
        component={LoginScreen}
        options={{
          tabBarIcon: ({ color }) => <Text style={[styles.tabBarIcon, { color }]}>👤</Text>,
        }}
      />
    </Tab.Navigator>
  );
}
