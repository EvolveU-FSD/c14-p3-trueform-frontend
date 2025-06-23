import React, { useState } from 'react';
import CustomizationScreenWrapper from '../../components/CustomizationScreenWrapper';
import CustomizationOptionGrid from '../../components/CustomizationOptionGrid';

const COLLAR_OPTIONS = [
  {
    id: 'italian1',
    title: 'Italian Collar 1 Button',
    image: require('../../../assets/images/collar/Italian Collar 1 Button.jpeg'),
  },
 
  
  {
    id: 'french1',
    title: 'French Collar 1 Button',
    image: require('../../../assets/images/collar/French Collar 1 Button.jpeg'),
  },
  {
    id: 'cutaway1',
    title: 'Cut Away 1 Button',
    image: require('../../../assets/images/collar/Cut Away 1 Button.jpeg'),
  },
  
 
  {
    id: 'buttondown',
    title: 'Button Down',
     image: require('../../../assets/images/collar/Button Down.jpeg'),
  },
  
];

export default function CollarStyle() {
  const [selected, setSelected] = useState('');

  return (
    <CustomizationScreenWrapper currentStep='CollarStyle'>
      <CustomizationOptionGrid
        options={COLLAR_OPTIONS}
        selected={selected}
        onSelect={setSelected}
      />
    </CustomizationScreenWrapper>
  );
}
