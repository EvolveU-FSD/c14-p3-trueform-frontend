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
    image: require('../../../assets/images/pocket/Classic Round.jpeg'),
  },
  {
    id: 'classic-angle',
    title: 'Classic Angle',
    image: require('../../../assets/images/pocket/Classic Angle.jpeg'),
  },
  {
    id: 'diamond-straight',
    title: 'Diamond Straight',
    image: require('../../../assets/images/pocket/Diamond Straight.jpeg'),
  },
  {
    id: 'classic-square',
    title: 'Classic Square',
    image: require('../../../assets/images/pocket/Classic Square.jpeg'),
  },
  {
    id: 'round-flap',
    title: 'Round Flap',
    image: require('../../../assets/images/pocket/Round Flap.jpeg'),
  },
  {
    id: 'angle-flap',
    title: 'Angle Flap',
    image: require('../../../assets/images/pocket/Angle Flap.jpeg'),
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
