import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomizationOptionGrid from '../../components/CustomizationOptionGrid';
import CustomizationNavigation from '../../components/CustomizationNavigation';
import { useCustomization } from '../../context/CustomizationContext';

const SLEEVE_OPTIONS = [
  {
    id: 'long',
    title: 'Long Sleeve',
    image: { uri: 'https://www.propercloth.com/media/shirts/variations/sleeve-long.jpg' }
  },
  {
    id: 'short',
    title: 'Short Sleeve',
    image: { uri: 'https://www.propercloth.com/media/shirts/variations/sleeve-short.jpg' }
  }
];

export default function SleeveStyle() {
  const { state, updateOption } = useCustomization();
  
  return (
    <View style={styles.container}>
      <CustomizationOptionGrid
        options={SLEEVE_OPTIONS}
        selected={state.sleeveStyle}
        onSelect={(value) => updateOption('sleeveStyle', value)}
      />
      <CustomizationNavigation currentStep="SleeveStyle" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
