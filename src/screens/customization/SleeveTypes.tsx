import React from 'react';
import CustomizationScreenWrapper from '../../components/CustomizationScreenWrapper';
import CustomizationOptionGrid from '../../components/CustomizationOptionGrid';
import { useCustomization } from '../../context/CustomizationContext';

const SLEEVE_OPTIONS = [
  {
    id: 'long',
    title: 'Long Sleeve',
    image: { uri: 'https://www.propercloth.com/media/shirts/variations/sleeve-long.jpg' },
  },
  {
    id: 'short',
    title: 'Short Sleeve',
    image: { uri: 'https://www.propercloth.com/media/shirts/variations/sleeve-short.jpg' },
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
