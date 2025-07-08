import React from 'react';
import { View, Text } from 'react-native';
import createStyles from '../styles/CartScreenStyles';

export default function Cart() {
  const styles = createStyles();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart</Text>
      <Text style={styles.subtitle}>Cart functionality coming soon...</Text>
    </View>
  );
}
