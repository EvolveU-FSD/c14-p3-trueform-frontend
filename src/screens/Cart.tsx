import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useCart } from '../context/CartContext';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import createStyles from '../styles/CartScreenStyles';

type CartScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Cart'>;

export default function Cart() {
  const styles = createStyles();
  const { items } = useCart();
  const navigation = useNavigation<CartScreenNavigationProp>();

  const handleProceedToCheckout = () => {
    navigation.navigate('Checkout');
  };

  if (items.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.subtitle}>Your cart is empty</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
    </SafeAreaView>
  );
}
