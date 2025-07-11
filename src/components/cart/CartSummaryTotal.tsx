import React from 'react';
import { View, Text } from 'react-native';
import { useCart } from '../../context/CartContext';
import createStyles from '../../styles/CartSummaryStyles';

export default function CartSummaryTotal() {
  const styles = createStyles();
  const { getCartTotal } = useCart();

  const total = getCartTotal();

  return (
    <View style={styles.totalRow}>
      <Text style={styles.totalLabel}>Total</Text>
      <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
    </View>
  );
}
