import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useCart } from '../context/CartContext';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import CartMeasurementDisplay from '../components/cart/CartMeasurementDisplay';
import createStyles from '../styles/CartScreenStyles';

type CartScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Cart'>;

export default function Cart() {
  const styles = createStyles();
  const { items } = useCart();
  const navigation = useNavigation<CartScreenNavigationProp>();

  const handleProceedToCheckout = () => {
    navigation.navigate('Checkout');
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'Cart',
      headerShadowVisible: true,
    });
  }, [navigation]);

  if (items.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={[]}>
        <StatusBar barStyle='dark-content' />
        <Text style={styles.subtitle}>Your cart is empty</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <StatusBar barStyle='dark-content' />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.itemsContainer}>
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </View>

        <CartSummary />

        <CartMeasurementDisplay />

        <TouchableOpacity style={styles.checkoutButton} onPress={handleProceedToCheckout}>
          <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
