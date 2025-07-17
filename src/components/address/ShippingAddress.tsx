import React, { useEffect } from 'react';
import Address from './Address';
import { AddressValidationErrors, ShippingAddressProps } from '../../types/address.types';
import { validateAddress } from 'utils/addressValidation';

export default function ShippingAddress({
  data,
  onDataChange,
  errors,
  saveAddress,
  onSaveAddressChange,
  showSavedAddresses = false,
  savedAddresses = [],
  selectedSavedAddressId,
  onSavedAddressSelect,
  onValidation,
}: ShippingAddressProps) {
  useEffect(() => {
    // Validate on data change and call validation callback
    if (onValidation) {
      const validation = validateAddress(data);
      const errors = validation.errors.reduce((acc, error) => {
        acc[error.field as keyof AddressValidationErrors] = error.message;
        return acc;
      }, {} as AddressValidationErrors);

      onValidation(validation.isValid, errors);
    }
  }, [data, onValidation]);

  return (
    <Address
      title='Shipping Address'
      data={data}
      onDataChange={onDataChange}
      errors={errors}
      showSaveAddress={true}
      saveAddress={saveAddress}
      onSaveAddressChange={onSaveAddressChange}
      showSavedAddresses={showSavedAddresses}
      savedAddresses={savedAddresses}
      selectedSavedAddressId={selectedSavedAddressId}
      onSavedAddressSelect={onSavedAddressSelect}
    />
  );
}
