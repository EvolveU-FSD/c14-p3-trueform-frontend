import React, { useState } from 'react';
import CustomizationScreenWrapper from '../../components/CustomizationScreenWrapper';
import CustomizationOptionGrid from '../../components/CustomizationOptionGrid';

const COLLAR_OPTIONS = [
  {
    id: 'italian1',
    title: 'Italian Collar 1 Button',
    image: { uri: 'https://www.propercloth.com/collars/italian1.jpg' }
  },
  {
    id: 'italian2',
    title: 'Italian Collar 2 Button',
    image: { uri: 'https://www.propercloth.com/collars/italian2.jpg' }
  },
  {
    id: 'french1',
    title: 'French Collar 1 Button',
    image: { uri: 'https://www.propercloth.com/collars/french1.jpg' }
  },
  {
    id: 'french2',
    title: 'French Collar 2 Button',
    image: { uri: 'https://www.propercloth.com/collars/french2.jpg' }
  },
  {
    id: 'cutaway1',
    title: 'Cut Away 1 Button',
    image: { uri: 'https://www.propercloth.com/collars/cutaway1.jpg' }
  },
  {
    id: 'cutaway2',
    title: 'Cut Away 2 Button',
    image: { uri: 'https://www.propercloth.com/collars/cutaway2.jpg' }
  },
  {
    id: 'round',
    title: 'Round Collar',
    image: { uri: 'https://www.propercloth.com/collars/round.jpg' }
  },
  {
    id: 'buttondown',
    title: 'Button Down',
    image: { uri: 'https://www.propercloth.com/collars/buttondown.jpg' }
  },
  {
    id: 'tab',
    title: 'Tab Collar',
    image: { uri: 'https://www.propercloth.com/collars/tab.jpg' }
  },
  {
    id: 'hidden',
    title: 'Hidden Button',
    image: { uri: 'https://www.propercloth.com/collars/hidden.jpg' }
  },
  {
    id: 'batman',
    title: 'Batman Collar',
    image: { uri: 'https://www.propercloth.com/collars/batman.jpg' }
  },
  {
    id: 'modern',
    title: 'Modern Collar',
    image: { uri: 'https://www.propercloth.com/collars/modern.jpg' }
  }
];

export default function CollarStyle() {
  const [selected, setSelected] = useState('');

  return (
    <CustomizationScreenWrapper currentStep="CollarStyle">
      <CustomizationOptionGrid
        options={COLLAR_OPTIONS}
        selected={selected}
        onSelect={setSelected}
      />
    </CustomizationScreenWrapper>
  );
}
