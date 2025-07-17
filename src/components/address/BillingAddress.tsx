import React from 'react';
import Address from './Address';
import { BillingAddressProps } from '../../types/address.types';

export default function BillingAddress({
  data,
  onDataChange,
  errors,
  sameAsShipping = false,
  onSameAsShippingChange,
  saveAddress,
  onSaveAddressChange,
  showSavedAddresses = false,
  savedAddresses = [],
  selectedSavedAddressId,
  onSavedAddressSelect,
}: BillingAddressProps) {
  return (
    <Address
      title='Billing Address'
      data={data}
      onDataChange={onDataChange}
      errors={errors}
      showSameAsShipping
      sameAsShipping={sameAsShipping}
      onSameAsShippingChange={onSameAsShippingChange}
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
