import React from 'react';
import CustomizationScreenWrapper from '../../components/CustomizationScreenWrapper';
import CustomizationOptionGrid from '../../components/CustomizationOptionGrid';
import { useCustomization } from '../../context/CustomizationContext';

const CUFF_OPTIONS = [
  {
    id: 'single',
    title: 'Single Button',
    image: require('../../../assets/images/cuff/Single Button.jpeg'),
  },
  {
    id: 'double',
    title: 'Double Button',
    image: require('../../../assets/images/cuff/Double Button.jpeg'),
  },
  {
    id: 'french',
    title: 'French Cuff',
    image: require('../../../assets/images/cuff/French Cuff.jpeg'),
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
