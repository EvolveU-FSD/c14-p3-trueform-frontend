import React, { useState } from 'react';
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

  const handleShippingChange = (field: keyof Address, value: string) => {
    setShippingAddress((prev) => ({ ...prev, [field]: value }));
  };

  const handleBillingChange = (field: keyof Address, value: string) => {
    setBillingAddress((prev) => ({ ...prev, [field]: value }));
  };

  const handleBackToCart = () => {
    navigation.goBack();
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

      console.log(createAddressData);
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
    const saveResults: boolean[] = [];

    // Save addresses if user is authenticated and checkboxes are checked
    if (isAuthenticated) {
      if (saveShippingAddress) {
        const shippingSaved = await saveAddressToAPI(shippingAddress, true);
        saveResults.push(shippingSaved);
      }

      if (saveBillingAddress && !sameAsShipping) {
        const billingSaved = await saveAddressToAPI(billingAddress, false);
        saveResults.push(billingSaved);
      }

      // Show feedback about save operations
      if (saveResults.length > 0) {
        const allSaved = saveResults.every((result) => result);
        const someFailed = saveResults.some((result) => !result);

        if (allSaved) {
          Alert.alert('Success', 'Address(es) saved successfully!');
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
        />
        <BillingAddress
          data={sameAsShipping ? shippingAddress : billingAddress}
          onDataChange={handleBillingChange}
          sameAsShipping={sameAsShipping}
          onSameAsShippingChange={setSameAsShipping}
          saveAddress={saveBillingAddress}
          onSaveAddressChange={setSaveBillingAddress}
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
