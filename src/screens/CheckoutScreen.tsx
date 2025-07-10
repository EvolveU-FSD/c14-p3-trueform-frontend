import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { CheckoutScreenProps } from '../types/navigation';
import createStyles from '../styles/CheckoutScreenStyles';
import ShippingAddress from '../components/address/ShippingAddress';
import BillingAddress from '../components/address/BillingAddress';
import { AddressData } from '../components/address/Address';

export default function CheckoutScreen({ navigation }: CheckoutScreenProps) {
  const styles = createStyles();

  const [shippingAddress, setShippingAddress] = useState<AddressData>({
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
  });

  const [billingAddress, setBillingAddress] = useState<AddressData>({
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
  });

  const [sameAsShipping, setSameAsShipping] = useState(true);

  const handleShippingChange = (field: keyof AddressData, value: string) => {
    setShippingAddress((prev) => ({ ...prev, [field]: value }));
  };

  const handleBillingChange = (field: keyof AddressData, value: string) => {
    setBillingAddress((prev) => ({ ...prev, [field]: value }));
  };

  const handleBackToCart = () => {
    navigation.goBack();
  };

  const handleProceedToPayment = () => {
    navigation.navigate('Payment');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <Text style={styles.subtitle}>Coming Soon!</Text>
        <Text style={styles.description}>
          We&apos;re working hard to bring you a seamless checkout experience. This feature will be
          available soon.
        </Text>

        <ShippingAddress data={shippingAddress} onDataChange={handleShippingChange} />
        <BillingAddress
          data={sameAsShipping ? shippingAddress : billingAddress}
          onDataChange={handleBillingChange}
          sameAsShipping={sameAsShipping}
          onSameAsShippingChange={setSameAsShipping}
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
