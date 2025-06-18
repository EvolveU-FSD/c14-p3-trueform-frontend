import React from 'react';
import CustomizationScreenWrapper from '../../components/CustomizationScreenWrapper';
import CustomizationOptionGrid from '../../components/CustomizationOptionGrid';
import { useCustomization } from '../../context/CustomizationContext';

const CUFF_OPTIONS = [
  {
    id: 'single',
    title: 'Single Button',
    image: { uri: 'https://www.propercloth.com/media/shirts/variations/cuff-single.jpg' },
  },
  {
    id: 'double',
    title: 'Double Button',
    image: { uri: 'https://www.propercloth.com/media/shirts/variations/cuff-double.jpg' },
  },
  {
    id: 'french',
    title: 'French Cuff',
    image: { uri: 'https://www.propercloth.com/media/shirts/variations/cuff-french.jpg' },
  },
];

export default function CuffStyle() {
  const { state, updateOption } = useCustomization();

  return (
    <CustomizationScreenWrapper currentStep='CuffStyle'>
      <CustomizationOptionGrid
        options={CUFF_OPTIONS}
        selected={state.cuffStyle}
        onSelect={(value) => updateOption('cuffStyle', value)}
      />
    </CustomizationScreenWrapper>
  );
}
