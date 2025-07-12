export interface AddressData {
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
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
  data: AddressData;
  onDataChange: (field: keyof AddressData, value: string) => void;
  errors?: AddressErrors;
  showSameAsShipping?: boolean;
  sameAsShipping?: boolean;
  onSameAsShippingChange?: (value: boolean) => void;
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
  data: AddressData;
  onDataChange: (field: keyof AddressData, value: string) => void;
  errors?: AddressErrors;
}

export interface BillingAddressProps {
  data: AddressData;
  onDataChange: (field: keyof AddressData, value: string) => void;
  errors?: AddressErrors;
  sameAsShipping?: boolean;
  onSameAsShippingChange?: (value: boolean) => void;
}

export interface StateOption {
  label: string;
  value: string;
}

export interface CountryOption {
  label: string;
  value: string;
}
