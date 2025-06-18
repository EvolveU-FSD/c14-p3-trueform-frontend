import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getNextStep, getPreviousStep } from '../utils/customizationSteps';
import { createStyles } from '../styles/CustomizationNavigationStyles';
import { useTheme } from '../theme/ThemeContext';

type Props = {
  currentStep: string;
};

export default function CustomizationNavigation({ currentStep }: Props) {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation();
  const nextStep = getNextStep(currentStep);
  const prevStep = getPreviousStep(currentStep);

  const handleBack = () => {
    if (prevStep) {
      navigation.navigate(prevStep as never);
    } else {
      navigation.goBack();
    }
  };

  const handleNext = () => {
    if (nextStep) {
      navigation.navigate(nextStep as never);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleBack}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>

      {nextStep && (
        <TouchableOpacity style={[styles.button, styles.primaryButton]} onPress={handleNext}>
          <Text style={[styles.buttonText, styles.primaryButtonText]}>Next</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
