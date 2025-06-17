import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import CustomizationScreenWrapper from '../../components/CustomizationScreenWrapper';
import { useCustomization } from '../../context/CustomizationContext';
import { createStyles } from '../../styles/MonogramStyles';
import { useTheme } from '../theme/ThemeContext';

const MONOGRAM_OPTIONS = [
  {
    id: 'none',
    title: 'NO MONOGRAM',
    image: { uri: 'https://www.propercloth.com/monograms/none.jpg' },
  },
  {
    id: 'on-collar',
    title: 'ON COLLAR',
    image: { uri: 'https://www.propercloth.com/monograms/collar.jpg' },
  },
  {
    id: 'on-chest',
    title: 'ON CHEST',
    image: { uri: 'https://www.propercloth.com/monograms/chest.jpg' },
  },
  {
    id: 'on-sleeve',
    title: 'ON SLEEVE',
    image: { uri: 'https://www.propercloth.com/monograms/sleeve.jpg' },
  },
  {
    id: 'on-cuff-left',
    title: 'ON CUFF (LEFT)',
    image: { uri: 'https://www.propercloth.com/monograms/cuff-left.jpg' },
  },
  {
    id: 'on-cuff-right',
    title: 'ON CUFF (RIGHT)',
    image: { uri: 'https://www.propercloth.com/monograms/cuff-right.jpg' },
  },
  {
    id: 'on-waist',
    title: 'ON WAIST',
    image: { uri: 'https://www.propercloth.com/monograms/waist.jpg' },
  },
  {
    id: 'on-placket',
    title: 'ON PLACKET',
    image: { uri: 'https://www.propercloth.com/monograms/placket.jpg' },
  },
];

export default function Monogram() {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { state, updateOption } = useCustomization();

  return (
    <CustomizationScreenWrapper currentStep='Monogram'>
      <Text style={styles.title}>CHOOSE YOUR MONOGRAM POSITION</Text>
      <View style={styles.gridContainer}>
        {MONOGRAM_OPTIONS.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[styles.gridItem, state.monogram === option.id && styles.selectedItem]}
            onPress={() => updateOption('monogram', option.id)}
          >
            <Text style={styles.itemText}>{option.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </CustomizationScreenWrapper>
  );
}
