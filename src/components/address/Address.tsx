import React from 'react';
import { View, Text } from 'react-native';
import AddressField from './AddressField';
import StatePickerField from './StatePickerField';
import CountryPickerField from './CountryPickerField';
import CheckboxField from './CheckboxField';
import SavedAddressDropdown from './SavedAddressDropdown';
import useCreateStyles from '../../styles/AddressStyles';
import { AddressProps } from '../../types/address.types';
import { useAuth } from '../../context/AuthContext';

export default function Address({
  title,
  data,
  onDataChange,
  errors = {},
  showSameAsShipping = false,
  sameAsShipping = false,
  onSameAsShippingChange,
  showSaveAddress = false,
  saveAddress = false,
  onSaveAddressChange,
  showSavedAddresses = false,
  savedAddresses = [],
  selectedSavedAddressId,
  onSavedAddressSelect,
}: AddressProps) {
  const styles = useCreateStyles();
  const { isAuthenticated } = useAuth();

  // Determine if address fields should be disabled based on saved address selection
  const isAddressDisabled = !!selectedSavedAddressId;

  return (
    <View style={[styles.container, isAddressDisabled && styles.disabledContainer]}>
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
          {showSavedAddresses && isAuthenticated && savedAddresses && onSavedAddressSelect && (
            <SavedAddressDropdown
              label='Use Saved Address'
              addresses={savedAddresses}
              selectedAddressId={selectedSavedAddressId}
              onAddressSelect={onSavedAddressSelect}
              placeholder='Select a saved address'
            />
          )}

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
              disabled={isAddressDisabled}
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
              disabled={isAddressDisabled}
            />
          </View>

          <AddressField
            label='Company'
            value={data.company || ''}
            onChangeText={(text) => onDataChange('company', text)}
            placeholder='Company name (optional)'
            error={errors.company}
            disabled={isAddressDisabled}
          />

          <AddressField
            label='Address Line 1'
            value={data.address1}
            onChangeText={(text) => onDataChange('address1', text)}
            placeholder='Street address'
            error={errors.address1}
            required
            autoComplete='street-address'
            disabled={isAddressDisabled}
          />

          <AddressField
            label='Address Line 2'
            value={data.address2 || ''}
            onChangeText={(text) => onDataChange('address2', text)}
            placeholder='Apartment, suite, etc. (optional)'
            error={errors.address2}
            autoComplete='address-line2'
            disabled={isAddressDisabled}
          />

          <AddressField
            label='City'
            value={data.city}
            onChangeText={(text) => onDataChange('city', text)}
            placeholder='Enter city'
            error={errors.city}
            required
            disabled={isAddressDisabled}
          />

          <View style={styles.row}>
            <StatePickerField
              label='State'
              value={data.state}
              onValueChange={(value) => onDataChange('state', value)}
              error={errors.state}
              required
              style={styles.halfWidth}
              disabled={isAddressDisabled}
            />
            <AddressField
              label='ZIP Code'
              value={data.zipCode}
              onChangeText={(text) => onDataChange('zipCode', text)}
              placeholder='12345'
              error={errors.zipCode}
              required
              keyboardType='numeric'
              autoComplete='zip-code'
              style={styles.halfWidth}
              disabled={isAddressDisabled}
            />
          </View>

          <CountryPickerField
            label='Country'
            value={data.country}
            onValueChange={(value) => onDataChange('country', value)}
            error={errors.country}
            required
            disabled={isAddressDisabled}
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
            disabled={isAddressDisabled}
          />

          {showSaveAddress && onSaveAddressChange && !selectedSavedAddressId && (
            <View style={styles.saveAddressContainer}>
              <CheckboxField
                label={
                  isAuthenticated
                    ? 'Save this address for future use'
                    : 'Please create an account if you would like to save your address for future use'
                }
                value={isAuthenticated ? saveAddress : false}
                // TODO: Find a better way to handle the empty function below.
                // eslint-disable-next-line @typescript-eslint/no-empty-function
                onValueChange={isAuthenticated ? onSaveAddressChange : () => {}}
                style={!isAuthenticated ? styles.disabledCheckbox : undefined}
              />
            </View>
          )}
        </>
      )}
    </View>
  );
}
