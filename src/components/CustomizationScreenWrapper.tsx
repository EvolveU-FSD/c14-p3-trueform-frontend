import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import CustomizationProgress from './CustomizationProgress';
import CustomizationNavigation from './CustomizationNavigation';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6',
  },
  scrollContainer: {
    flex: 1,
    paddingVertical: 16,
  },
});
