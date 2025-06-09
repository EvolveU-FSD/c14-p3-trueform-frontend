import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { CustomizationProvider } from '../../context/CustomizationContext';
import CustomizationProgress from '../../components/CustomizationProgress';
import CollarStyle from './CollarStyle';
import CuffStyle from './CuffStyle';
import PocketStyle from './PocketStyle';
import SleeveStyle from './SleeveStyle';
import ShirtLength from './ShirtLength';
import Monogram from './Monogram';
import Buttons from './Buttons';
import Measurement from './Measurement';

const Tab = createMaterialTopTabNavigator();

const CUSTOMIZATION_STEPS = [
  { id: 'collar', title: 'Collar Style', component: CollarStyle },
  { id: 'cuff', title: 'Cuff Style', component: CuffStyle },
  { id: 'pocket', title: 'Pocket Style', component: PocketStyle },
  { id: 'sleeve', title: 'Sleeve Style', component: SleeveStyle },
  { id: 'length', title: 'Shirt Length', component: ShirtLength },
  { id: 'monogram', title: 'Monogram', component: Monogram },
  { id: 'buttons', title: 'Buttons', component: Buttons },
  { id: 'measurement', title: 'Measurement', component: Measurement }
];

export default function CustomizationScreen() {
  return (
    <CustomizationProvider>
      <View style={styles.container}>
        <CustomizationProgress currentStep={0} />
        <Tab.Navigator
          screenOptions={{
            tabBarScrollEnabled: true,
            tabBarItemStyle: styles.tabItem,
            tabBarStyle: styles.tabBar,
            tabBarIndicatorStyle: { backgroundColor: '#4caf50' },
          }}
        >
          {CUSTOMIZATION_STEPS.map(step => (
            <Tab.Screen
              key={step.id}
              name={step.id}
              component={step.component}
              options={{ title: step.title }}
            />
          ))}
        </Tab.Navigator>
      </View>
    </CustomizationProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6', // Light cream color directly in styles
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
