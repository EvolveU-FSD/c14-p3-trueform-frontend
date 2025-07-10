import React from 'react';
import Address, { AddressData, AddressErrors } from './Address';

interface BillingAddressProps {
  data: AddressData;
  onDataChange: (field: keyof AddressData, value: string) => void;
  errors?: AddressErrors;
  sameAsShipping?: boolean;
  onSameAsShippingChange?: (value: boolean) => void;
}

export default function BillingAddress({
  data,
  onDataChange,
  errors,
  sameAsShipping = false,
  onSameAsShippingChange,
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
    />
  );
}
