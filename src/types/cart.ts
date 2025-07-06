import { Clothing } from './clothing';

export interface CartCustomization {
  customizationId: string;
  customizationName: string;
  optionId: string;
  optionName: string;
  priceModifier?: number;
}

export interface CartItem {
  id: string; // Unique cart item ID
  itemId: string; // Original clothing item ID
  item: Clothing; // The base clothing item
  customizations: CartCustomization[]; // Applied customizations
  quantity: number;
  basePrice: number;
  totalPrice: number; // Base price + customization modifiers
  addedAt: Date;
}

export interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (item: Clothing, customizations: CartCustomization[]) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartItem: (cartItemId: string) => CartItem | undefined;
}
