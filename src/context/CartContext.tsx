import React, { createContext, useContext, useState, useCallback } from 'react';
import { CartItem, CartCustomization, CartContextType } from '../types/cart';
import { Clothing } from '../types/clothing';

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const generateCartItemId = useCallback(() => {
    return `cart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  // TODO: Double check rounding value is correct here for whatever variance is acceptable.
  const calculateTotalPrice = useCallback(
    (basePrice: number, customizations: CartCustomization[]) => {
      const customizationTotal = customizations.reduce((total, customization) => {
        return total + (customization.priceModifier || 0);
      }, 0);
      return basePrice + customizationTotal;
    },
    [],
  );

  const addItem = useCallback(
    (item: Clothing, customizations: CartCustomization[]) => {
      const cartItemId = generateCartItemId();
      const totalPrice = calculateTotalPrice(item.price, customizations);

      const cartItem: CartItem = {
        id: cartItemId,
        itemId: item.id,
        item,
        customizations,
        quantity: 1,
        basePrice: item.price,
        totalPrice,
        addedAt: new Date(),
      };

      setItems((prevItems) => [...prevItems, cartItem]);
    },
    [generateCartItemId, calculateTotalPrice],
  );

  const removeItem = useCallback((cartItemId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== cartItemId));
  }, []);

  const updateQuantity = useCallback(
    (cartItemId: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(cartItemId);
        return;
      }

      setItems((prevItems) =>
        prevItems.map((item) => (item.id === cartItemId ? { ...item, quantity } : item)),
      );
    },
    [removeItem],
  );

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const getCartItem = useCallback(
    (cartItemId: string) => {
      return items.find((item) => item.id === cartItemId);
    },
    [items],
  );

  // Calculate totals
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce((total, item) => total + item.totalPrice * item.quantity, 0);

  const contextValue: CartContextType = {
    items,
    totalItems,
    totalPrice,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getCartItem,
  };

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
