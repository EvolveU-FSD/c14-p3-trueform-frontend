import React from 'react';
import CustomizationScreenWrapper from '../../components/CustomizationScreenWrapper';
import CustomizationOptionGrid from '../../components/CustomizationOptionGrid';
import { useCustomization } from '../../context/CustomizationContext';

const SLEEVE_OPTIONS = [
  {
    id: 'long',
    title: 'Long Sleeve',
   image: require('../../../assets/images/Sleeve/Long Sleeve.jpeg'),
  },
  {
    id: 'short',
    title: 'Short Sleeve',
     image: require('../../../assets/images/Sleeve/Short Sleeve.jpeg'),
  },
];

export default function SleeveStyle() {
  const { state, updateOption } = useCustomization();

  return (
    <CustomizationScreenWrapper currentStep='SleeveStyle'>
      <CustomizationOptionGrid
        options={SLEEVE_OPTIONS}
        selected={state.sleeveStyle}
        onSelect={(value) => updateOption('sleeveStyle', value)}
      />
    </CustomizationScreenWrapper>
  );
}
