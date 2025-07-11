import React from 'react';
import { View, Text } from 'react-native';
import AddressField from './AddressField';
import StatePickerField from './StatePickerField';
import CountryPickerField from './CountryPickerField';
import CheckboxField from './CheckboxField';
import useCreateStyles from '../../styles/AddressStyles';
import { AddressProps } from '../../types/address.types';

export default function Address({
  title,
  data,
  onDataChange,
  errors = {},
  showSameAsShipping = false,
  sameAsShipping = false,
  onSameAsShippingChange,
}: AddressProps) {
  const styles = useCreateStyles();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      {showSameAsShipping && onSameAsShippingChange && (
        <CheckboxField
          label='Same as shipping address'
          value={sameAsShipping}
          onValueChange={onSameAsShippingChange}
        />
      )}

      {!(showSameAsShipping && sameAsShipping) && (
        <>
          <View style={styles.row}>
            <AddressField
              label='First Name'
              value={data.firstName}
              onChangeText={(text) => onDataChange('firstName', text)}
              placeholder='Enter first name'
              error={errors.firstName}
              required
              autoComplete='name'
              style={styles.halfWidth}
            />
            <AddressField
              label='Last Name'
              value={data.lastName}
              onChangeText={(text) => onDataChange('lastName', text)}
              placeholder='Enter last name'
              error={errors.lastName}
              required
              autoComplete='name'
              style={styles.halfWidth}
            />
          </View>

          <AddressField
            label='Company'
            value={data.company || ''}
            onChangeText={(text) => onDataChange('company', text)}
            placeholder='Company name (optional)'
            error={errors.company}
          />

          <AddressField
            label='Address Line 1'
            value={data.address1}
            onChangeText={(text) => onDataChange('address1', text)}
            placeholder='Street address'
            error={errors.address1}
            required
            autoComplete='street-address'
          />

          <AddressField
            label='Address Line 2'
            value={data.address2 || ''}
            onChangeText={(text) => onDataChange('address2', text)}
            placeholder='Apartment, suite, etc. (optional)'
            error={errors.address2}
            autoComplete='address-line2'
          />

          <AddressField
            label='City'
            value={data.city}
            onChangeText={(text) => onDataChange('city', text)}
            placeholder='Enter city'
            error={errors.city}
            required
          />

          <View style={styles.row}>
            <StatePickerField
              label='State'
              value={data.state}
              onValueChange={(value) => onDataChange('state', value)}
              error={errors.state}
              required
              style={styles.halfWidth}
            />
            <AddressField
              label='ZIP Code'
              value={data.zipCode}
              onChangeText={(text) => onDataChange('zipCode', text)}
              placeholder='12345'
              error={errors.zipCode}
              required
              keyboardType='numeric'
              autoComplete='postal-code'
              style={styles.halfWidth}
            />
          </View>

          <CountryPickerField
            label='Country'
            value={data.country}
            onValueChange={(value) => onDataChange('country', value)}
            error={errors.country}
            required
          />

          <AddressField
            label='Phone Number'
            value={data.phone}
            onChangeText={(text) => onDataChange('phone', text)}
            placeholder='(555) 123-4567'
            error={errors.phone}
            required
            keyboardType='phone-pad'
            autoComplete='tel'
          />
        </>
      )}
    </View>
  );
}
