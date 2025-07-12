import { Address } from './address.types';

export interface Customer {
  id: string;
  firebaseUid: string;
  email: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
  lastLogin?: string;
  defaultBillingAddressId?: string;
  defaultShippingAddressId?: string;
  defaultBillingAddress?: Address;
  defaultShippingAddress?: Address;
  addresses?: Address[];
}

export interface CreateCustomerDTO {
  name: string;
  email: string;
  firebaseUid?: string;
}

export interface UpdateCustomerDTO {
  name?: string;
  email?: string;
  lastLogin?: string;
}
