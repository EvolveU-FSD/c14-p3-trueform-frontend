import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CollarStyle from './customization/CollarStyle';
import CuffStyle from './customization/CuffStyle';
import PocketStyle from './customization/PocketStyle';
import SleeveStyle from './customization/SleeveStyle';
import ShirtLength from './customization/ShirtLength';
import Monogram from './customization/Monogram';
import Buttons from './customization/Buttons';
import Measurement from './customization/Measurement';

const Tab = createMaterialTopTabNavigator();

export const CUSTOMIZATION_STEPS = [
  { id: 'collar', title: 'Collar', component: CollarStyle },
  { id: 'cuff', title: 'Cuff', component: CuffStyle },
  { id: 'pocket', title: 'Pocket', component: PocketStyle },
  { id: 'sleeve', title: 'Sleeve', component: SleeveStyle },
  { id: 'length', title: 'Length', component: ShirtLength },
  { id: 'monogram', title: 'Monogram', component: Monogram },
  { id: 'buttons', title: 'Buttons', component: Buttons },
  { id: 'measurement', title: 'Measurement', component: Measurement },
];

export default function CustomizationScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          tabBarScrollEnabled: true,
          tabBarItemStyle: styles.tabItem,
          tabBarStyle: styles.tabBar,
        }}
      >
        {CUSTOMIZATION_STEPS.map((step) => (
          <Tab.Screen
            key={step.id}
            name={step.id}
            component={step.component}
            options={{ title: step.title }}
          />
        ))}
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabBar: {
    elevation: 0,
    shadowOpacity: 0,
    backgroundColor: '#f8f8f8',
  },
  tabItem: {
    width: 'auto',
    paddingHorizontal: 16,
  },
});
