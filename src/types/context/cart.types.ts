import { Clothing } from '../clothing';

export interface CartCustomization {
  customizationId: string;
  optionId: string;
  name: string;
  optionName: string;
  mediaUrl?: string;
  priceModifier?: number;
}

export interface CartItem {
  id: string;
  clothing: Clothing;
  customizations: CartCustomization[];
  quantity: number;
  basePrice: number;
  customizationPrice: number;
  totalPrice: number;
  mediaUrl?: string;
}

export interface CartContextType {
  items: CartItem[];
  addItem: (clothing: Clothing, customizations: CartCustomization[]) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getItemCount: () => number;
}
