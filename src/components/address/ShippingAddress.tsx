import React from 'react';
import Address from './Address';
import { ShippingAddressProps } from '../../types/address.types';

export default function ShippingAddress({
  data,
  onDataChange,
  errors,
  saveAddress,
  onSaveAddressChange,
  disabled = false,
}: ShippingAddressProps) {
  return (
    <Address
      title='Shipping Address'
      data={data}
      onDataChange={onDataChange}
      errors={errors}
      showSaveAddress={true}
      saveAddress={saveAddress}
      onSaveAddressChange={onSaveAddressChange}
      disabled={disabled}
    />
  );
}
