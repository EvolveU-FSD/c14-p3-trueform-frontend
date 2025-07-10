import React from 'react';
import { Image } from 'react-native';
import { CartItem as CartItemType } from '../../types/context/cart.types';
import { getImageUrl } from '../../utils/imageHandling';
import createStyles from '../../styles/CartItemStyles';

interface CartItemImageProps {
  item: CartItemType;
}

export default function CartItemImage({ item }: CartItemImageProps) {
  const styles = createStyles();

  return (
    <Image
      source={{ uri: getImageUrl(item.clothing.mediaUrl) }}
      style={styles.image}
      resizeMode='cover'
    />
  );
}
