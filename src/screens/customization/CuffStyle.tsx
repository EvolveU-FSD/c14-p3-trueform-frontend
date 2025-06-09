import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomizationOptionGrid from '../../components/CustomizationOptionGrid';
import CustomizationNavigation from '../../components/CustomizationNavigation';
import { useCustomization } from '../../context/CustomizationContext';

const CUFF_OPTIONS = [
  {
    id: 'single',
    title: 'Single Button',
    image: { uri: 'https://www.propercloth.com/media/shirts/variations/cuff-single.jpg' }
  },
  {
    id: 'double',
    title: 'Double Button',
    image: { uri: 'https://www.propercloth.com/media/shirts/variations/cuff-double.jpg' }
  },
  {
    id: 'french',
    title: 'French Cuff',
    image: { uri: 'https://www.propercloth.com/media/shirts/variations/cuff-french.jpg' }
  }
];

export default function CuffStyle() {
  const { state, updateOption } = useCustomization();
  
  return (
    <View style={styles.container}>
      <CustomizationOptionGrid
        options={CUFF_OPTIONS}
        selected={state.cuffStyle}
        onSelect={(value) => updateOption('cuffStyle', value)}
      />
      <CustomizationNavigation currentStep="CuffStyle" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
