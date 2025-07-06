import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { useCart } from '../context/CartContext';
import { getImageUrl } from '../utils/imageHandling';
import createStyles from '../styles/CartScreenStyles';

export default function Cart() {
  const { items, totalItems, totalPrice, removeItem, updateQuantity } = useCart();
  const styles = createStyles();

  const formatPrice = (price: number) => `$${price.toFixed(2)}`;

  const renderCartItem = ({ item }: { item: any }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: getImageUrl(item.item.mediaUrl) }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.item.name}</Text>
        <Text style={styles.itemPrice}>{formatPrice(item.basePrice)}</Text>

        {/* Customizations */}
        {item.customizations.length > 0 && (
          <View style={styles.customizationsContainer}>
            <Text style={styles.customizationsTitle}>Customizations:</Text>
            {item.customizations.map((customization: any, index: number) => (
              <View key={index} style={styles.customizationRow}>
                <Text style={styles.customizationName}>
                  {customization.customizationName}: {customization.optionName}
                </Text>
                {customization.priceModifier !== 0 && (
                  <Text style={styles.customizationPrice}>
                    {customization.priceModifier > 0 ? '+' : ''}
                    {formatPrice(customization.priceModifier)}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => updateQuantity(item.id, item.quantity - 1)}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => updateQuantity(item.id, item.quantity + 1)}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.itemActions}>
        <Text style={styles.itemTotal}>{formatPrice(item.totalPrice * item.quantity)}</Text>
        <TouchableOpacity style={styles.removeButton} onPress={() => removeItem(item.id)}>
          <Text style={styles.removeButtonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (items.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySubtitle}>Add some items to get started</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />

      <View style={styles.summary}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total Items: {totalItems}</Text>
          <Text style={styles.summaryValue}>{formatPrice(totalPrice)}</Text>
        </View>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
