import React, { useRef, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

export const CUSTOMIZATION_STEPS = [
  { id: 'CollarStyle', title: 'Collar' },
  { id: 'CuffStyle', title: 'Cuff' },
  { id: 'PocketStyle', title: 'Pocket' },
  { id: 'SleeveStyle', title: 'Sleeve' },
  { id: 'ShirtLength', title: 'Length' },
  { id: 'Monogram', title: 'Monogram' },
  { id: 'Buttons', title: 'Buttons' },
  { id: 'Measurement', title: 'Measurement' }
];

type Props = {
  currentStep: string;
};

export default function CustomizationProgress({ currentStep }: Props) {
  const scrollViewRef = useRef<ScrollView>(null);
  const currentStepIndex = CUSTOMIZATION_STEPS.findIndex(step => step.id === currentStep);

  useEffect(() => {
    // Auto scroll to current step with offset
    if (scrollViewRef.current && currentStepIndex >= 0) {
      scrollViewRef.current.scrollTo({
        x: currentStepIndex * 80, // Approximate width of each step
        animated: true
      });
    }
  }, [currentStep]);

  return (
    <ScrollView 
      ref={scrollViewRef}
      horizontal 
      showsHorizontalScrollIndicator={false} 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {CUSTOMIZATION_STEPS.map((step, index) => (
        <View
          key={step.id}
          style={[
            styles.stepItem,
            currentStep === step.id && styles.activeStep
          ]}
        >
          <View style={[styles.stepNumber, currentStep === step.id && styles.activeStepNumber]}>
            <Text style={styles.stepNumberText}>{index + 1}</Text>
          </View>
          <Text style={[styles.stepTitle, currentStep === step.id && styles.activeStepTitle]}>
            {step.title}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8, // Reduced from 16
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#FAF9F6',
    maxHeight: 60, // Add fixed height
  },
  contentContainer: {
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  stepItem: {
    alignItems: 'center',
    marginRight: 20, // Reduced from 24
    opacity: 0.7,
    width: 80, // Fixed width for consistent spacing
  },
  activeStep: {
    opacity: 1,
  },
  stepNumber: {
    width: 24, // Reduced from 28
    height: 24, // Reduced from 28
    borderRadius: 12,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2, // Reduced from 4
  },
  activeStepNumber: {
    backgroundColor: '#4A3419',
  },
  stepNumberText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  stepTitle: {
    fontSize: 11, // Reduced from 12
    color: '#666',
    fontWeight: '500',
  },
  activeStepTitle: {
    color: '#4A3419',
  },
});
