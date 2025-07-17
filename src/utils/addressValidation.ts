import { Address } from '../types/address.types';
import { AddressValidationErrors, ValidationResult } from '../types/address.types';

export const validateAddress = (address: Address): ValidationResult => {
  const errors: AddressValidationErrors = {};

  // Required field validations
  if (!address.firstName?.trim()) {
    errors.firstName = 'First name is required';
  }

  if (!address.lastName?.trim()) {
    errors.lastName = 'Last name is required';
  }

  if (!address.address1?.trim()) {
    errors.address1 = 'Address is required';
  }

  if (!address.city?.trim()) {
    errors.city = 'City is required';
  }

  if (!address.state?.trim()) {
    errors.state = 'State is required';
  }

  if (!address.zipCode?.trim()) {
    errors.zipCode = 'ZIP code is required';
  } else if (!/^\d{5}(-\d{4})?$/.test(address.zipCode.trim())) {
    errors.zipCode = 'Invalid ZIP code format';
  }

  if (!address.country?.trim()) {
    errors.country = 'Country is required';
  }

  // Optional phone validation
  if (address.phone?.trim()) {
    const phoneRegex = /^[+]?[1-9]?[\d\s\-()]{10,}$/;
    if (!phoneRegex.test(address.phone.trim())) {
      errors.phone = 'Invalid phone number format';
    }
  }

  const isValid = Object.keys(errors).length === 0;

  return {
    isValid,
    errors: Object.entries(errors).map(([field, message]) => ({ field, message })),
  };
};

export const getFieldError = (
  errors: AddressValidationErrors,
  field: keyof AddressValidationErrors,
): string | undefined => {
  return errors[field];
};
