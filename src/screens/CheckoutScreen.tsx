import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { CheckoutScreenProps } from '../types/navigation';
import createStyles from '../styles/CheckoutScreenStyles';

export default function CheckoutScreen({ navigation }: CheckoutScreenProps) {
  const styles = createStyles();

  const handleBackToCart = () => {
    navigation.goBack();
  };

  const handleProceedToPayment = () => {
    navigation.navigate('Payment');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <Text style={styles.title}>Checkout</Text>
        <Text style={styles.subtitle}>Coming Soon!</Text>
        <Text style={styles.description}>
          We&apos;re working hard to bring you a seamless checkout experience. This feature will be
          available soon.
        </Text>

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
