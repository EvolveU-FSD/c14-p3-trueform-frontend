import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import CustomizationScreenWrapper from '../../components/CustomizationScreenWrapper';
import { useCustomization } from '../../context/CustomizationContext';

const MONOGRAM_OPTIONS = [
  {
    id: 'none',
    title: 'NO MONOGRAM',
    image: { uri: 'https://www.propercloth.com/monograms/none.jpg' }
  },
  {
    id: 'on-collar',
    title: 'ON COLLAR',
    image: { uri: 'https://www.propercloth.com/monograms/collar.jpg' }
  },
  {
    id: 'on-chest',
    title: 'ON CHEST',
    image: { uri: 'https://www.propercloth.com/monograms/chest.jpg' }
  },
  {
    id: 'on-sleeve',
    title: 'ON SLEEVE',
    image: { uri: 'https://www.propercloth.com/monograms/sleeve.jpg' }
  },
  {
    id: 'on-cuff-left',
    title: 'ON CUFF (LEFT)',
    image: { uri: 'https://www.propercloth.com/monograms/cuff-left.jpg' }
  },
  {
    id: 'on-cuff-right',
    title: 'ON CUFF (RIGHT)',
    image: { uri: 'https://www.propercloth.com/monograms/cuff-right.jpg' }
  },
  {
    id: 'on-waist',
    title: 'ON WAIST',
    image: { uri: 'https://www.propercloth.com/monograms/waist.jpg' }
  },
  {
    id: 'on-placket',
    title: 'ON PLACKET',
    image: { uri: 'https://www.propercloth.com/monograms/placket.jpg' }
  }
];

export default function Monogram() {
  const { state, updateOption } = useCustomization();
  
  return (
    <CustomizationScreenWrapper currentStep="Monogram">
      <Text style={styles.title}>CHOOSE YOUR MONOGRAM POSITION</Text>
      <View style={styles.gridContainer}>
        {MONOGRAM_OPTIONS.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.gridItem,
              state.monogram === option.id && styles.selectedItem
            ]}
            onPress={() => updateOption('monogram', option.id)}
          >
            <Text style={styles.itemText}>{option.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </CustomizationScreenWrapper>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    padding: 16,
    paddingBottom: 8,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 16,
  },
  gridItem: {
    width: '47%',
    height: 50, // Reduced from 80 to 50
    backgroundColor: '#4A3419',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12, // Reduced from 16 to 12
    borderRadius: 4,
  },
  selectedItem: {
    backgroundColor: '#8B6B43',
  },
  itemText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
