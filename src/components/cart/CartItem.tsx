import React from 'react';
import { View, Text, Image } from 'react-native';
import { CartItem as CartItemType } from '../../types/context/cart.types';
import { getImageUrl } from '../../utils/imageHandling';
import createStyles from '../../styles/CartItemStyles';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const styles = createStyles();

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: getImageUrl(item.clothing.mediaUrl) }}
        style={styles.image}
        resizeMode='cover'
      />
      <View style={styles.textContainer}>
        <Text style={styles.itemName}>{item.clothing.name}</Text>
      </View>
    </View>
  );
}
