import React from 'react';
import CustomizationScreenWrapper from '../../components/CustomizationScreenWrapper';
import CustomizationOptionGrid from '../../components/CustomizationOptionGrid';
import { useCustomization } from '../../context/CustomizationContext';

const BUTTON_OPTIONS = [
  {
    id: 'white',
    title: 'White Buttons',
    image: { uri: 'https://www.propercloth.com/media/shirts/variations/buttons-white.jpg' },
  },
  {
    id: 'black',
    title: 'Black Buttons',
    image: { uri: 'https://www.propercloth.com/media/shirts/variations/buttons-black.jpg' },
  },
  {
    id: 'blue-horn',
    title: 'Blue Horn Buttons',
    image: { uri: 'https://www.propercloth.com/media/shirts/variations/buttons-blue-horn.jpg' },
  },
  {
    id: 'brown-horn',
    title: 'Brown Horn Buttons',
    image: { uri: 'https://www.propercloth.com/media/shirts/variations/buttons-brown-horn.jpg' },
  },
  {
    id: 'clear',
    title: 'Clear Buttons',
    image: { uri: 'https://www.propercloth.com/media/shirts/variations/buttons-clear.jpg' },
  },
];

export default function Buttons() {
  const { state, updateOption } = useCustomization();

  return (
    <CustomizationScreenWrapper currentStep='Buttons'>
      <CustomizationOptionGrid
        options={BUTTON_OPTIONS}
        selected={state.buttonColor}
        onSelect={(value) => updateOption('buttonColor', value)}
      />
    </CustomizationScreenWrapper>
  );
}
