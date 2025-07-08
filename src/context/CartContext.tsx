import React, { createContext, useContext, useState } from 'react';
import { Clothing } from '../types/clothing';

export interface CartCustomization {
  customizationId: string;
  optionId: string;
  name: string;
  optionName: string;
  priceModifier?: number;
}

export interface CartItem {
  id: string; // Unique identifier for the cart item
  clothing: Clothing;
  customizations: CartCustomization[];
  quantity: number;
  basePrice: number;
  customizationPrice: number;
  totalPrice: number; // (basePrice + customizationPrice) * quantity
}

interface CartContextType {
  items: CartItem[];
  addItem: (clothing: Clothing, customizations: CartCustomization[]) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const calculatePrices = (
    clothing: Clothing,
    customizations: CartCustomization[],
    quantity: number,
  ) => {
    const basePrice = clothing.price;
    const customizationPrice = customizations.reduce(
      (sum, custom) => sum + (custom.priceModifier || 0),
      0,
    );
    const totalPrice = (basePrice + customizationPrice) * quantity;

    return { basePrice, customizationPrice, totalPrice };
  };

  const generateCartItemId = (clothing: Clothing, customizations: CartCustomization[]): string => {
    // Create unique ID based on clothing item and customizations
    const customizationString = customizations
      .map((c) => `${c.customizationId}:${c.optionId}`)
      .sort()
      .join('-');
    return `${clothing.id}-${customizationString}`;
  };

  const addItem = (clothing: Clothing, customizations: CartCustomization[]) => {
    const cartItemId = generateCartItemId(clothing, customizations);
    const { basePrice, customizationPrice, totalPrice } = calculatePrices(
      clothing,
      customizations,
      1,
    );

    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((item) => item.id === cartItemId);

      if (existingItemIndex !== -1) {
        // Item with same customizations already exists, increase quantity
        const updatedItems = [...prevItems];
        const existingItem = updatedItems[existingItemIndex];
        const newQuantity = existingItem.quantity + 1;
        const prices = calculatePrices(clothing, customizations, newQuantity);

        updatedItems[existingItemIndex] = {
          ...existingItem,
          quantity: newQuantity,
          totalPrice: prices.totalPrice,
        };

        return updatedItems;
      } else {
        // Add new item
        const newItem: CartItem = {
          id: cartItemId,
          clothing,
          customizations,
          quantity: 1,
          basePrice,
          customizationPrice,
          totalPrice,
        };

        return [...prevItems, newItem];
      }
    });
  };

  const removeItem = (itemId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === itemId) {
          const prices = calculatePrices(item.clothing, item.customizations, quantity);
          return {
            ...item,
            quantity,
            totalPrice: prices.totalPrice,
          };
        }
        return item;
      }),
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getCartTotal = (): number => {
    return items.reduce((total, item) => total + item.totalPrice, 0);
  };

  const getItemCount = (): number => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getCartTotal,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
