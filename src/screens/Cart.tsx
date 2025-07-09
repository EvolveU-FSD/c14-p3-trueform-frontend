import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useCart } from '../context/CartContext';
import CartItem from '../components/cart/CartItem';
import createStyles from '../styles/CartScreenStyles';

export default function Cart() {
  const styles = createStyles();
  const { items } = useCart();

  if (items.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.subtitle}>Your cart is empty</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CartItem item={item} />}
        contentContainerStyle={styles.itemsList}
      />
    </View>
  );
}
