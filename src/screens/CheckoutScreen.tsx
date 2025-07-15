import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import createStyles from '../styles/CheckoutScreenStyles';
import { Address } from '../types/address.types';
import { CheckoutScreenProps } from '../types/navigation';
import LoginStatus from '../components/checkout/CheckoutLoginStatus';
import ShippingAddress from '../components/address/ShippingAddress';
import BillingAddress from '../components/address/BillingAddress';
import { AddressService } from '../services/address.service';
import { CustomerService } from '../services/customer.service';
import { useAuth } from '../context/AuthContext';
import { CreateAddressDTO } from '../types/address.types';
import { AddressValidationErrors } from '../types/address.types';

export default function CheckoutScreen({ navigation }: CheckoutScreenProps) {
  const styles = createStyles();
  const { isAuthenticated, user } = useAuth();

  const [shippingAddress, setShippingAddress] = useState<Address>({
    id: '',
    customerId: '',
    firstName: '',
    lastName: '',
    company: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
    isDefault: false,
    createdAt: '',
    updatedAt: '',
  });

  const [billingAddress, setBillingAddress] = useState<Address>({
    id: '',
    customerId: '',
    firstName: '',
    lastName: '',
    company: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
    isDefault: false,
    createdAt: '',
    updatedAt: '',
  });

  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [saveShippingAddress, setSaveShippingAddress] = useState(false);
  const [saveBillingAddress, setSaveBillingAddress] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState<Address[]>([]);
  const [selectedShippingAddressId, setSelectedShippingAddressId] = useState<string>('');
  const [selectedBillingAddressId, setSelectedBillingAddressId] = useState<string>('');

  // Validation state
  const [shippingErrors, setShippingErrors] = useState<AddressValidationErrors>({});
  const [billingErrors, setBillingErrors] = useState<AddressValidationErrors>({});
  const [isShippingValid, setIsShippingValid] = useState(false);
  const [isBillingValid, setIsBillingValid] = useState(false);

  // Fetch saved addresses when user is authenticated
  useEffect(() => {
    const fetchSavedAddresses = async () => {
      if (isAuthenticated && user) {
        try {
          const customer = await CustomerService.getByFirebaseUid(user.uid);
          if (customer) {
            const addresses = await AddressService.getByCustomerId(customer.id);
            setSavedAddresses(addresses);
          }
        } catch (error) {
          console.error('Error fetching saved addresses:', error);
        }
      } else {
        setSavedAddresses([]);
        setSelectedShippingAddressId('');
        setSelectedBillingAddressId('');
      }
    };

    fetchSavedAddresses();
  }, [isAuthenticated, user]);

  // Validation callbacks
  const handleShippingValidation = useCallback(
    (isValid: boolean, errors: AddressValidationErrors) => {
      setIsShippingValid(isValid);
      setShippingErrors(errors);
    },
    [],
  );

  const handleBillingValidation = useCallback(
    (isValid: boolean, errors: AddressValidationErrors) => {
      setIsBillingValid(isValid);
      setBillingErrors(errors);
    },
    [],
  );

  const handleShippingChange = (field: keyof Address, value: string) => {
    setShippingAddress((prev) => ({ ...prev, [field]: value }));
    // Clear errors for this field when user starts typing
    if (shippingErrors[field as keyof AddressValidationErrors]) {
      setShippingErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleBillingChange = (field: keyof Address, value: string) => {
    setBillingAddress((prev) => ({ ...prev, [field]: value }));
    // Clear errors for this field when user starts typing
    if (billingErrors[field as keyof AddressValidationErrors]) {
      setBillingErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleShippingSavedAddressSelect = (address: Address | null) => {
    if (address) {
      setSelectedShippingAddressId(address.id);
      setShippingAddress(address);
      setSaveShippingAddress(false);
      // Clear validation errors when using saved address
      setShippingErrors({});
      setIsShippingValid(true);
    } else {
      setSelectedShippingAddressId('');
    }
  };

  const handleBillingSavedAddressSelect = (address: Address | null) => {
    if (address) {
      setSelectedBillingAddressId(address.id);
      setBillingAddress(address);
      setSaveBillingAddress(false);
      // Clear validation errors when using saved address
      setBillingErrors({});
      setIsBillingValid(true);
    } else {
      setSelectedBillingAddressId('');
    }
  };

  const handleBackToCart = () => {
    navigation.goBack();
  };

  const compareAddresses = (address1: Address, address2: Address): boolean => {
    // Compare all relevant fields (excluding id, customerId, timestamps, and isDefault)
    return (
      address1.firstName.toLowerCase() === address2.firstName.toLowerCase() &&
      address1.lastName.toLowerCase() === address2.lastName.toLowerCase() &&
      (address1.company || '').toLowerCase() === (address2.company || '').toLowerCase() &&
      address1.address1.toLowerCase() === address2.address1.toLowerCase() &&
      (address1.address2 || '').toLowerCase() === (address2.address2 || '').toLowerCase() &&
      address1.city.toLowerCase() === address2.city.toLowerCase() &&
      address1.state === address2.state &&
      address1.zipCode === address2.zipCode &&
      address1.country === address2.country &&
      (address1.phone || '').replace(/\D/g, '') === (address2.phone || '').replace(/\D/g, '')
    );
  };

  const findExistingAddress = (
    addressData: Address,
    existingAddresses: Address[],
  ): Address | null => {
    return existingAddresses.find((existing) => compareAddresses(addressData, existing)) || null;
  };

  const saveAddressToAPI = async (addressData: Address, isShipping: boolean): Promise<boolean> => {
    if (!isAuthenticated || !user) {
      return false;
    }

    try {
      // Get the customer data from the API using Firebase UID
      const customer = await CustomerService.getByFirebaseUid(user.uid);

      if (!customer) {
        console.error('Customer not found in database');
        return false;
      }

      // Get existing addresses for the customer
      const existingAddresses = await AddressService.getByCustomerId(customer.id);

      // Check if this address already exists
      const existingAddress = findExistingAddress(addressData, existingAddresses);

      if (existingAddress) {
        console.log(
          `${isShipping ? 'Shipping' : 'Billing'} address already exists, skipping save:`,
          existingAddress,
        );
        return true; // Return true because the address exists (no need to save)
      }

      // Address is new, proceed with saving
      const createAddressData: CreateAddressDTO = {
        customerId: customer.id,
        firstName: addressData.firstName,
        lastName: addressData.lastName,
        company: addressData.company,
        address1: addressData.address1,
        address2: addressData.address2,
        city: addressData.city,
        state: addressData.state,
        zipCode: addressData.zipCode,
        country: addressData.country,
        phone: addressData.phone,
        isDefault: false,
      };

      console.log('Saving new address:', createAddressData);
      const savedAddress = await AddressService.create(createAddressData);

      if (savedAddress) {
        console.log(
          `${isShipping ? 'Shipping' : 'Billing'} address saved successfully:`,
          savedAddress,
        );
        return true;
      } else {
        console.error(`Failed to save ${isShipping ? 'shipping' : 'billing'} address`);
        return false;
      }
    } catch (error) {
      console.error(`Error saving ${isShipping ? 'shipping' : 'billing'} address:`, error);
      return false;
    }
  };

  const handleProceedToPayment = async () => {
    if (!isShippingValid || (!sameAsShipping && !isBillingValid)) {
      Alert.alert('Validation Error', 'Please fix the highlighted fields before proceeding.', [
        { text: 'OK' },
      ]);
      return;
    }

    const saveResults: boolean[] = [];
    const messages: string[] = [];

    // Save addresses if user is authenticated and checkboxes are checked
    if (isAuthenticated) {
      if (saveShippingAddress && !selectedShippingAddressId) {
        const shippingSaved = await saveAddressToAPI(shippingAddress, true);
        saveResults.push(shippingSaved);
        if (shippingSaved) {
          messages.push('Shipping address processed');
        }
      }

      if (saveBillingAddress && !sameAsShipping && !selectedBillingAddressId) {
        const billingSaved = await saveAddressToAPI(billingAddress, false);
        saveResults.push(billingSaved);
        if (billingSaved) {
          messages.push('Billing address processed');
        }
      }

      // Show feedback about save operations
      if (saveResults.length > 0) {
        const allSaved = saveResults.every((result) => result);
        const someFailed = saveResults.some((result) => !result);

        if (allSaved && messages.length > 0) {
          Alert.alert('Success', messages.join(', ') + ' successfully!');
        } else if (someFailed) {
          Alert.alert(
            'Partial Success',
            'Some addresses could not be saved, but you can still proceed with payment.',
          );
        }
      }
    }

    navigation.navigate('Payment');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <LoginStatus />
        <ShippingAddress
          data={shippingAddress}
          onDataChange={handleShippingChange}
          saveAddress={saveShippingAddress}
          onSaveAddressChange={setSaveShippingAddress}
          showSavedAddresses={true}
          savedAddresses={savedAddresses}
          selectedSavedAddressId={selectedShippingAddressId}
          onSavedAddressSelect={handleShippingSavedAddressSelect}
          errors={shippingErrors}
          onValidation={handleShippingValidation}
        />
        <BillingAddress
          data={sameAsShipping ? shippingAddress : billingAddress}
          onDataChange={handleBillingChange}
          sameAsShipping={sameAsShipping}
          onSameAsShippingChange={setSameAsShipping}
          saveAddress={saveBillingAddress}
          onSaveAddressChange={setSaveBillingAddress}
          showSavedAddresses={true}
          savedAddresses={savedAddresses}
          selectedSavedAddressId={selectedBillingAddressId}
          onSavedAddressSelect={handleBillingSavedAddressSelect}
          errors={billingErrors}
          onValidation={handleBillingValidation}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackToCart}>
            <Text style={styles.backButtonText}>Back to Cart</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.paymentButton} onPress={handleProceedToPayment}>
            <Text style={styles.paymentButtonText}>Go to Payment</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
