export type OrderStatus =
  | 'PENDING'
  | 'PAID'
  | 'IN_PRODUCTION'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED';

export type MeasurementUnit = 'INCHES' | 'CENTIMETERS';
export type MeasurementSource = 'MANUAL' | 'BODY_SCAN' | 'SAVED_PROFILE';

export interface OrderAddress {
  id: string;
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderMeasurement {
  id: string;
  orderId: string;
  customerId: string;
  values: Record<string, number>;
  unit: MeasurementUnit;
  source: MeasurementSource;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItemCustomization {
  id: string;
  orderItemId: string;
  options: Record<string, any>;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  customizations: OrderItemCustomization[];
  product?: any; // Reference to clothing item
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  customerId: string;
  status: OrderStatus;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  shippingAddressId: string;
  billingAddressId: string;
  paymentIntentId?: string;
  items: OrderItem[];
  measurements: OrderMeasurement[];
  shippingAddress: OrderAddress;
  billingAddress: OrderAddress;
  customer?: any; // Reference to customer
  createdAt: string;
  updatedAt: string;
}

// DTO Types
export interface CreateOrderAddressDTO {
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone?: string;
}

export interface CreateOrderItemDTO {
  productId: string;
  quantity: number;
  price: number;
  customizations?: Record<string, any>;
  notes?: string;
}

export interface CreateOrderMeasurementDTO {
  values: Record<string, number>;
  unit: MeasurementUnit;
  source: MeasurementSource;
}

export interface CreateOrderDTO {
  customerId: string;
  status: OrderStatus;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  shippingAddressId: string;
  billingAddressId: string;
  paymentIntentId?: string;
  items: CreateOrderItemDTO[];
  measurements: CreateOrderMeasurementDTO[];
  shippingAddress: CreateOrderAddressDTO;
  billingAddress: CreateOrderAddressDTO;
}
