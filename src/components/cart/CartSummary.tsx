import React from 'react';
import { View } from 'react-native';
import CartSummarySubTotal from './CartSummarySubTotal';
import CartSummaryShipping from './CartSummaryShipping';
import CartSummaryTotal from './CartSummaryTotal';
import createStyles from '../../styles/CartSummaryStyles';

export default function CartSummary() {
  const styles = createStyles();

  return (
    <View style={styles.container}>
      <CartSummarySubTotal />
      <CartSummaryShipping />
      <View style={styles.divider} />
      <CartSummaryTotal />
    </View>
  );
}
