import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { CartItem as CartItemType } from '../../types/context/cart.types';
import { useCart } from '../../context/CartContext';
import createStyles from '../../styles/CartItemStyles';

interface CartItemQuantityProps {
  item: CartItemType;
}

export default function CartItemQuantity({ item }: CartItemQuantityProps) {
  const styles = createStyles();
  const { updateQuantity } = useCart();

  const handleIncrease = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  return (
    <View style={styles.quantityContainer}>
      <TouchableOpacity
        style={[styles.quantityButton, item.quantity <= 1 && styles.quantityButtonDisabled]}
        onPress={handleDecrease}
        disabled={item.quantity <= 1}
      >
        <FontAwesome5 name='minus' size={12} color={item.quantity <= 1 ? '#ccc' : '#333'} />
      </TouchableOpacity>

      <Text style={styles.quantityText}>{item.quantity}</Text>

      <TouchableOpacity style={styles.quantityButton} onPress={handleIncrease}>
        <FontAwesome5 name='plus' size={12} color='#333' />
      </TouchableOpacity>
    </View>
  );
}
