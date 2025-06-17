import React from 'react';
import CustomizationScreenWrapper from '../../components/CustomizationScreenWrapper';
import CustomizationOptionGrid from '../../components/CustomizationOptionGrid';
import { useCustomization } from '../../context/CustomizationContext';

const MEASUREMENT_OPTIONS = [
  {
    id: 'ai',
    title: 'AI Measurement',
    // image: require('../../../assets/images/customization/measurement/ai.png'),
    description: 'Measure with your phone camera',
  },
  {
    id: 'manual',
    title: 'Manual Entry',
    // image: require('../../../assets/images/customization/measurement/manual.png'),
    description: 'Enter measurements manually',
  },
];

export default function Measurement() {
  const { state, updateOption } = useCustomization();

  return (
    <CustomizationScreenWrapper currentStep='Measurement'>
      <CustomizationOptionGrid
        options={MEASUREMENT_OPTIONS}
        selected={state.measurementType}
        onSelect={(value) => updateOption('measurementType', value)}
      />
    </CustomizationScreenWrapper>
  );
}
