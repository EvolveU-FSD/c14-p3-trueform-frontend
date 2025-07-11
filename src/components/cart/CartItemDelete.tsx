import React from 'react';
import { TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { CartItem as CartItemType } from '../../types/context/cart.types';
import { useCart } from '../../context/CartContext';
import createStyles from '../../styles/CartItemStyles';

interface CartItemDeleteProps {
  item: CartItemType;
}

export default function CartItemDelete({ item }: CartItemDeleteProps) {
  const styles = createStyles();
  const { removeItem } = useCart();

  const handleDelete = () => {
    removeItem(item.id);
  };

  return (
    <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
      <FontAwesome5 name='trash-alt' size={16} color='#ffffff' />
    </TouchableOpacity>
  );
}
