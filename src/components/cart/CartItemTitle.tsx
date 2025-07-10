import React from 'react';
import { View, Text } from 'react-native';
import { CartItem as CartItemType } from '../../types/context/cart.types';
import createStyles from '../../styles/CartItemStyles';

interface CartItemTitleProps {
  item: CartItemType;
}

export default function CartItemTitle({ item }: CartItemTitleProps) {
  const styles = createStyles();

  return (
    <View style={styles.textContainer}>
      <Text style={styles.itemName}>{item.clothing.name}</Text>
    </View>
  );
}
