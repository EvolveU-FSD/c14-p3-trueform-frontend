import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useCart } from '../context/CartContext';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import createStyles from '../styles/CartScreenStyles';

export default function Cart() {
  const styles = createStyles();
  const { items } = useCart();

  const handleProceedToCheckout = () => {
    // Navigate to checkout/payment screen
    console.log('Proceed to checkout');
    // navigation.navigate('Payment');
  };

  if (items.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.subtitle}>Your cart is empty</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.itemsContainer}>
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </View>

      <CartSummary />

      <TouchableOpacity style={styles.checkoutButton} onPress={handleProceedToCheckout}>
        <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
