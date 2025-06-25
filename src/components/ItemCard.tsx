// src/components/ItemCard.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ItemCardProps } from '../types/product';
import createStyles from '../styles/ItemCardStyles';
import { CrossImage } from './CrossImage';

export default function ItemCard({ product, onPress }: ItemCardProps) {
  const styles = createStyles();

  const handlePress = () => {
    if (onPress) {
      onPress(product);
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <CrossImage source={product.image} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </View>
    </TouchableOpacity>
  );
}
