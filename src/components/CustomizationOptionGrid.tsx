import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

export type CustomizationOption = {
  id: string;
  title: string;
  image: any;
  description?: string;
};

type Props = {
  options: CustomizationOption[];
  selected: string;
  onSelect: (id: string) => void;
  gridStyle?: any;
  itemStyle?: any;
};

export default function CustomizationOptionGrid({ 
  options, 
  selected, 
  onSelect,
  gridStyle,
  itemStyle 
}: Props) {
  return (
    <View style={[styles.container, gridStyle]}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={[
            styles.option,
            itemStyle,
            selected === option.id && styles.selectedOption
          ]}
          onPress={() => onSelect(option.id)}
        >
          <Image source={option.image} style={styles.optionImage} />
          <Text style={styles.optionTitle}>{option.title}</Text>
          {option.description && (
            <Text style={styles.optionDescription}>{option.description}</Text>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
    justifyContent: 'space-between',
  },
  option: {
    width: '48%',
    marginBottom: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedOption: {
    backgroundColor: '#e8f5e9',
    borderColor: '#4caf50',
  },
  optionImage: {
    width: '100%',
    height: 120,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  optionTitle: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  optionDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  },
});
