export interface Address {
  id: string;
  customerId: string;
  firstName: string;
  lastName: string;
  company?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phoneNumber?: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
  customer?: {
    id: string;
    name: string;
    email: string;
  };
}

export interface CreateAddressDTO {
  customerId: string;
  firstName: string;
  lastName: string;
  company?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phoneNumber?: string;
  isDefault?: boolean;
}

export interface UpdateAddressDTO {
  firstName?: string;
  lastName?: string;
  company?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  phoneNumber?: string;
  isDefault?: boolean;
}
