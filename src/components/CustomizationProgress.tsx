import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { CUSTOMIZATION_STEPS } from '../utils/customizationSteps';

type Props = {
  currentStep: string;
};

export default function CustomizationProgress({ currentStep }: Props) {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {CUSTOMIZATION_STEPS.map((step, index) => (
          <View 
            key={step} 
            style={[
              styles.stepContainer,
              currentStep === step && styles.activeStep
            ]}
          >
            <Text style={[
              styles.stepNumber,
              currentStep === step && styles.activeText
            ]}>
              {index + 1}
            </Text>
            <Text style={[
              styles.stepText,
              currentStep === step && styles.activeText
            ]}>
              {step.replace(/([A-Z])/g, ' $1').trim()}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginHorizontal: 4,
  },
  activeStep: {
    borderBottomWidth: 2,
    borderBottomColor: '#4caf50',
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#eee',
    textAlign: 'center',
    lineHeight: 24,
    marginRight: 8,
    fontSize: 12,
    color: '#666',
  },
  stepText: {
    fontSize: 14,
    color: '#666',
  },
  activeText: {
    color: '#4caf50',
    fontWeight: '600',
  },
});
