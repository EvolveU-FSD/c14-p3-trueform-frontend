import React from 'react';
import Address, { AddressData, AddressErrors } from './Address';

interface ShippingAddressProps {
  data: AddressData;
  onDataChange: (field: keyof AddressData, value: string) => void;
  errors?: AddressErrors;
}

export default function ShippingAddress({ data, onDataChange, errors }: ShippingAddressProps) {
  return (
    <Address title='Shipping Address' data={data} onDataChange={onDataChange} errors={errors} />
  );
}
