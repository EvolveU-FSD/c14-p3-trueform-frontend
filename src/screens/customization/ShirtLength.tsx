import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomizationOptionGrid from '../../components/CustomizationOptionGrid';
import CustomizationNavigation from '../../components/CustomizationNavigation';
import { useCustomization } from '../../context/CustomizationContext';

const LENGTH_OPTIONS = [
  {
    id: 'tucked',
    title: 'Tucked',
    // image: require('../../../assets/images/customization/length/tucked.png'),
    description: 'Traditional tucked length'
  },
  {
    id: 'untucked',
    title: 'Untucked',
    // image: require('../../../assets/images/customization/length/untucked.png'),
    description: 'Casual untucked length'
  }
];

export default function ShirtLength() {
  const { state, updateOption } = useCustomization();
  
  return (
    <View style={styles.container}>
      <CustomizationOptionGrid
        options={LENGTH_OPTIONS}
        selected={state.shirtLength}
        onSelect={(value) => updateOption('shirtLength', value)}
      />
      <CustomizationNavigation currentStep="ShirtLength" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
