import React from 'react';
import CustomizationScreenWrapper from '../../components/CustomizationScreenWrapper';
import CustomizationOptionGrid from '../../components/CustomizationOptionGrid';
import { useCustomization } from '../../context/CustomizationContext';

const BUTTON_OPTIONS = [
  {
    id: 'white',
    title: 'White Buttons',
    image: require('../../../assets/images/buttons/White Buttons.jpeg'),
  },
  {
    id: 'black',
    title: 'Black Buttons',
    image: require('../../../assets/images/buttons/Black Buttons.jpeg'),
  },
  {
    id: 'blue-horn',
    title: 'Blue Horn Buttons',
    image: require('../../../assets/images/buttons/Blue Horn Buttons.jpeg'),
  },
  {
    id: 'brown-horn',
    title: 'Brown Horn Buttons',
    image: require('../../../assets/images/buttons/Brown Horn Buttons.jpeg'),
  },
  {
    id: 'clear',
    title: 'Clear Buttons',
    image: require('../../../assets/images/buttons/Clear Buttons.jpeg'),
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
