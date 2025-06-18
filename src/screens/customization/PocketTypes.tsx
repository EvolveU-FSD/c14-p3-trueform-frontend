import React from 'react';
import CustomizationScreenWrapper from '../../components/CustomizationScreenWrapper';
import { View, StyleSheet, ScrollView } from 'react-native';
import CustomizationOptionGrid from '../../components/CustomizationOptionGrid';
import CustomizationNavigation from '../../components/CustomizationNavigation';
import { useCustomization } from '../../context/CustomizationContext';
import { styles } from '../../styles/PocketTypesStyles';

const POCKET_OPTIONS = [
  {
    id: 'no-pocket',
    title: 'No Pocket',
    image: { uri: 'https://www.propercloth.com/pockets/no-pocket.jpg' },
  },
  {
    id: 'classic-round',
    title: 'Classic Round',
    image: { uri: 'https://www.propercloth.com/pockets/classic-round.jpg' },
  },
  {
    id: 'classic-angle',
    title: 'Classic Angle',
    image: { uri: 'https://www.propercloth.com/pockets/classic-angle.jpg' },
  },
  {
    id: 'diamond-straight',
    title: 'Diamond Straight',
    image: { uri: 'https://www.propercloth.com/pockets/diamond-straight.jpg' },
  },
  {
    id: 'classic-square',
    title: 'Classic Square',
    image: { uri: 'https://www.propercloth.com/pockets/classic-square.jpg' },
  },
  {
    id: 'round-flap',
    title: 'Round Flap',
    image: { uri: 'https://www.propercloth.com/pockets/round-flap.jpg' },
  },
  {
    id: 'angle-flap',
    title: 'Angle Flap',
    image: { uri: 'https://www.propercloth.com/pockets/angle-flap.jpg' },
  },
  {
    id: 'diamond-flap',
    title: 'Diamond Flap',
    image: { uri: 'https://www.propercloth.com/pockets/diamond-flap.jpg' },
  },
  {
    id: 'round-with-glass',
    title: 'Round With Glass',
    image: { uri: 'https://www.propercloth.com/pockets/round-with-glass.jpg' },
  },
];

export default function PocketStyle() {
  const { state, updateOption } = useCustomization();

  return (
    <CustomizationScreenWrapper currentStep='PocketStyle'>
      <CustomizationOptionGrid
        options={POCKET_OPTIONS}
        selected={state.pocketStyle}
        onSelect={(value) => updateOption('pocketStyle', value)}
      />
    </CustomizationScreenWrapper>
  );
}
