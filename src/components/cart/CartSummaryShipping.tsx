import React from 'react';
import { View, Text } from 'react-native';
import createStyles from '../../styles/CartSummaryStyles';

export default function CartSummaryShipping() {
  const styles = createStyles();

  // For now, shipping is free
  const shipping = 0;

  return (
    <View style={styles.summaryRow}>
      <Text style={styles.summaryLabel}>Shipping</Text>
      <Text style={styles.summaryValue}>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</Text>
    </View>
  );
}
