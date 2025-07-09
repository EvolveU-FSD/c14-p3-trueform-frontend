import React from 'react';
import { View } from 'react-native';
import { CartItem as CartItemType } from '../../types/context/cart.types';
import CartItemImage from './CartItemImage';
import CartItemTitle from './CartItemTitle';
import CartItemCustomization from './CartItemCustomization';
import createStyles from '../../styles/CartItemStyles';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const styles = createStyles();

  return (
    <View style={styles.container}>
      <CartItemImage item={item} />
      <View style={styles.contentContainer}>
        <CartItemTitle item={item} />
        <CartItemCustomization item={item} />
      </View>
    </View>
  );
}
