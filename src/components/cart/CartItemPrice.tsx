import React from 'react';
import { View, Text } from 'react-native';
import { CartItem as CartItemType } from '../../types/context/cart.types';
import createStyles from '../../styles/CartItemStyles';

interface CartItemPriceProps {
  item: CartItemType;
}

export default function CartItemPrice({ item }: CartItemPriceProps) {
  const styles = createStyles();

  const hasCustomizations = item.customizationPrice > 0;
  const basePrice = item.basePrice;
  const totalPrice = item.totalPrice / item.quantity; // Price per item

  return (
    <View style={styles.priceContainer}>
      {hasCustomizations && <Text style={styles.basePriceText}>Base: ${basePrice.toFixed(2)}</Text>}
      <Text style={styles.totalPriceText}>${totalPrice.toFixed(2)}</Text>
    </View>
  );
}
