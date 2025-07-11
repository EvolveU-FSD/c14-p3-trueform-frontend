import React from 'react';
import Address from './Address';
import { ShippingAddressProps } from '../../types/address.types';

export default function ShippingAddress({ data, onDataChange, errors }: ShippingAddressProps) {
  return (
    <Address title='Shipping Address' data={data} onDataChange={onDataChange} errors={errors} />
  );
}
