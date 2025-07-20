import { Clothing } from '../clothing';
import { Address } from '../address.types';
import { CreateMeasurementDTO } from '../measurement.types';

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
  shippingAddress: Partial<Address>;
  setShippingAddress: (address: Partial<Address>) => void;
  billingAddress: Partial<Address>;
  setBillingAddress: (address: Partial<Address>) => void;
  measurement: Partial<CreateMeasurementDTO>;
  setMeasurement: (measurement: Partial<CreateMeasurementDTO>) => void;
}
