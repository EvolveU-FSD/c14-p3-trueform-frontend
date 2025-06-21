import React from 'react';
import CustomizationScreenWrapper from '../../components/CustomizationScreenWrapper';
import CustomizationOptionGrid from '../../components/CustomizationOptionGrid';
import { useCustomization } from '../../context/CustomizationContext';

const LENGTH_OPTIONS = [
  {
    id: 'tucked',
    title: 'Tucked',
    image: require('../../../assets/images/customization/length/tucked.png'),
    description: 'Traditional tucked length',
  },
  {
    id: 'untucked',
    title: 'Untucked',
    image: require('../../../assets/images/customization/length/untucked.png'),
    description: 'Casual untucked length',
  },
];

export default function ShirtLength() {
  const { state, updateOption } = useCustomization();

  return (
    <CustomizationScreenWrapper currentStep='ShirtLength'>
      <CustomizationOptionGrid
        options={LENGTH_OPTIONS}
        selected={state.shirtLength}
        onSelect={(value) => updateOption('shirtLength', value)}
      />
    </CustomizationScreenWrapper>
  );
}
