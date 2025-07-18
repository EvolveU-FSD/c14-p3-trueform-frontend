import React, { useRef, useEffect } from 'react';
import { ScrollView, View, Text } from 'react-native';
import createStyles from '../styles/CustomizationProgressStyles';

export const CUSTOMIZATION_STEPS = [
  { id: 'CollarStyle', title: 'Collar' },
  { id: 'CuffStyle', title: 'Cuff' },
  { id: 'PocketStyle', title: 'Pocket' },
  { id: 'SleeveStyle', title: 'Sleeve' },
  { id: 'ShirtLength', title: 'Length' },
  { id: 'Monogram', title: 'Monogram' },
  { id: 'Buttons', title: 'Buttons' },
  { id: 'Measurement', title: 'Measurement' },
];

type Props = {
  currentStep: string;
};

export default function CustomizationProgress({ currentStep }: Props) {
  const styles = createStyles();
  const scrollViewRef = useRef<ScrollView>(null);
  const currentStepIndex = CUSTOMIZATION_STEPS.findIndex((step) => step.id === currentStep);

  useEffect(() => {
    // Auto scroll to current step with offset
    if (scrollViewRef.current && currentStepIndex >= 5) {
      scrollViewRef.current.scrollTo({
        x: currentStepIndex * 80, // Approximate width of each step
        animated: true,
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
        <View key={step.id} style={[styles.stepItem, currentStep === step.id && styles.activeStep]}>
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
