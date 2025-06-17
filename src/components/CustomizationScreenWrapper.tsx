import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import CustomizationProgress from './CustomizationProgress';
import CustomizationNavigation from './CustomizationNavigation';
import { styles } from '../styles/CustomizationScreenWrapperStyles';
type Props = {
  children: React.ReactNode;
  currentStep: string;
};

export default function CustomizationScreenWrapper({ children, currentStep }: Props) {
  return (
    <View style={styles.container}>
      <CustomizationProgress currentStep={currentStep} />
      <ScrollView style={styles.scrollContainer}>
        {children}
      </ScrollView>
      <CustomizationNavigation currentStep={currentStep} />
    </View>
  );
}


