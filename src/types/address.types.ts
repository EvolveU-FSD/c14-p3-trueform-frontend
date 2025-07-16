export interface Address {
  id: string;
  customerId: string;
  firstName: string;
  lastName: string;
  address1: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
  company?: string;
  address2?: string;
  phone?: string;
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
  address1: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  company?: string;
  address2?: string;
  phone?: string;
  isDefault?: boolean;
}

export interface UpdateAddressDTO {
  firstName?: string;
  lastName?: string;
  company?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  phone?: string;
  isDefault?: boolean;
}

export interface AddressErrors {
  firstName?: string;
  lastName?: string;
  company?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  phone?: string;
}

export interface AddressProps {
  title: string;
  data: Address;
  onDataChange: (field: keyof Address, value: string) => void;
  errors?: AddressErrors;
  showSameAsShipping?: boolean;
  sameAsShipping?: boolean;
  onSameAsShippingChange?: (value: boolean) => void;
  showSaveAddress?: boolean;
  saveAddress?: boolean;
  onSaveAddressChange?: (value: boolean) => void;
}

export interface AddressFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  autoComplete?:
    | 'name'
    | 'email'
    | 'street-address'
    | 'address-line1'
    | 'address-line2'
    | 'postal-code'
    | 'country'
    | 'tel';
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  multiline?: boolean;
  numberOfLines?: number;
  style?: any;
}

export interface StatePickerFieldProps {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  error?: string;
  required?: boolean;
  style?: any;
}

export interface CountryPickerFieldProps {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  error?: string;
  required?: boolean;
  style?: any;
}

export interface CheckboxFieldProps {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  style?: any;
}

export interface ShippingAddressProps {
  data: Address;
  onDataChange: (field: keyof Address, value: string) => void;
  errors?: AddressErrors;
  saveAddress?: boolean;
  onSaveAddressChange?: (value: boolean) => void;
}

export interface BillingAddressProps {
  data: Address;
  onDataChange: (field: keyof Address, value: string) => void;
  errors?: AddressErrors;
  sameAsShipping?: boolean;
  onSameAsShippingChange?: (value: boolean) => void;
  saveAddress?: boolean;
  onSaveAddressChange?: (value: boolean) => void;
}

export interface StateOption {
  label: string;
  value: string;
}

export interface CountryOption {
  label: string;
  value: string;
}
