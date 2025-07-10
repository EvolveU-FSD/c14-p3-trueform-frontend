import React from 'react';
import { View } from 'react-native';
import { CartItem as CartItemType } from '../../types/context/cart.types';
import CartItemImage from './CartItemImage';
import CartItemTitle from './CartItemTitle';
import CartItemCustomization from './CartItemCustomization';
import CartItemPrice from './CartItemPrice';
import CartItemQuantity from './CartItemQuantity';
import CartItemDelete from './CartItemDelete';
import createStyles from '../../styles/CartItemStyles';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const styles = createStyles();

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <CartItemImage item={item} />
        <CartItemPrice item={item} />
        <CartItemQuantity item={item} />
        <CartItemDelete item={item} />
      </View>
      <View style={styles.contentContainer}>
        <CartItemTitle item={item} />
        <CartItemCustomization item={item} />
      </View>
    </View>
  );
}
