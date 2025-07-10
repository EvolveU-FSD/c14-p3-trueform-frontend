import React from 'react';
import { View, Text } from 'react-native';
import { useCart } from '../../context/CartContext';
import createStyles from '../../styles/CartSummaryStyles';

export default function CartSummarySubTotal() {
  const styles = createStyles();
  const { getCartTotal } = useCart();

  const subtotal = getCartTotal();

  return (
    <View style={styles.summaryRow}>
      <Text style={styles.summaryLabel}>Subtotal</Text>
      <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
    </View>
  );
}
