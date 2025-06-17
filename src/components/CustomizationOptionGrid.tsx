import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import {styles} from '../styles/CustomizationOptionGridStyles';

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
          <Image
            source={{ uri: option.image }}
            style={styles.optionImage}
            resizeMode="contain"
          />
          <Text style={styles.optionTitle}>{option.title}</Text>
          {option.description && (
            <Text style={styles.optionDescription}>{option.description}</Text>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
}

