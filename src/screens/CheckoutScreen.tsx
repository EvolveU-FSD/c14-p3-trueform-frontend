import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CheckoutScreenProps } from '../types/navigation';
import createStyles from '../styles/CheckoutScreenStyles';
import ShippingAddress from '../components/address/ShippingAddress';
import BillingAddress from '../components/address/BillingAddress';
import LoginStatus from '../components/checkout/CheckoutLoginStatus';
import { AddressData } from '../types/address.types';

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

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'Checkout',
      headerShadowVisible: true,
      headerBackTitle: 'Cart',
      headerBackTitleVisible: true,
    });
  }, [navigation]);

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
    <SafeAreaView style={styles.container} edges={[]}>
      <StatusBar barStyle='dark-content' />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <LoginStatus />
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
    </SafeAreaView>
  );
}
