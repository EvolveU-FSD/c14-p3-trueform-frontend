import React from 'react';
import { View, Image } from 'react-native';
import { CartItem as CartItemType } from '../../types/context/cart.types';
import { getImageUrl } from '../../utils/imageHandling';
import createStyles from '../../styles/CartItemStyles';

interface CartItemCustomizationProps {
  item: CartItemType;
}

export default function CartItemCustomization({ item }: CartItemCustomizationProps) {
  const styles = createStyles();

  if (!item.customizations || item.customizations.length === 0) {
    return null;
  }

  return (
    <View style={styles.customizationGrid}>
      {item.customizations.map((customization, index) => (
        <View
          key={`${customization.customizationId}-${index}`}
          style={styles.customizationImageContainer}
        >
          <Image
            source={{ uri: getImageUrl(customization.mediaUrl) }}
            style={styles.customizationImage}
            resizeMode='cover'
          />
        </View>
      ))}
    </View>
  );
}
