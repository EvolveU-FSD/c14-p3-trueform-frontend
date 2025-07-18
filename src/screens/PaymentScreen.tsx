import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StripeProvider, CardField, useStripe } from '@stripe/stripe-react-native';
import type { CardFieldInput } from '@stripe/stripe-react-native';
import { showAlert } from '../utils/showAlerts';
import { Ionicons } from '@expo/vector-icons';
import { paymentScreenStyles as styles } from '../styles/PaymentScreenStyles';
import { useNavigation } from '@react-navigation/native';
import { PaymentScreenNavigationProp } from '../types/navigation';
import { useCart } from '../context/CartContext';

export default function PaymentScreen() {
  const [cardDetails, setCardDetails] = useState<CardFieldInput.Details | null>(null);
  const [loading, setLoading] = useState(false);
  const { confirmPayment } = useStripe();
  const navigation = useNavigation<PaymentScreenNavigationProp>();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'Payment',
      headerShadowVisible: true,
      headerBackTitle: 'Checkout',
      headerBackTitleVisible: true,
    });
  }, [navigation]);
  const { items, getCartTotal } = useCart();

  // Calculate order totals
  const subtotal = getCartTotal();
  const taxRate = 0.08; // 8% tax rate - you might want to make this configurable
  const tax = subtotal * taxRate;
  const shipping = 0.0; // Free shipping
  const total = subtotal + tax + shipping;
  console.log(JSON.stringify(items, null, 2));

  const formatCurrency = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  };

  const handlePayment = async () => {
    if (!cardDetails?.complete) {
      Alert.alert('Error', 'Please enter complete card details');
      return;
    }

    try {
      setLoading(true);

      // Convert dollars to cents for Stripe
      const amountInCents = Math.round(total * 100);

      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_BASE_URL}/payment/create-intent`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: amountInCents,
            currency: 'usd',
            orderItems: items.map((item) => ({
              id: item.id,
              name: item.clothing.name,
              quantity: item.quantity,
              price: item.totalPrice,
            })),
          }),
        },
      );

      const { clientSecret } = await response.json();

      if (!clientSecret) {
        throw new Error('Failed to create payment intent');
      }

      const { paymentIntent, error } = await confirmPayment(clientSecret, {
        paymentMethodType: 'Card',
      });

      if (error) {
        showAlert('Error', error.message);
        return;
      }

      if (paymentIntent?.status === 'Succeeded') {
        const verifyResponse = await fetch(
          `${process.env.EXPO_PUBLIC_API_BASE_URL}/payment/verify`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              paymentIntentId: paymentIntent.id,
            }),
          },
        );

        const verifyResult = await verifyResponse.json();

        if (verifyResult.success) {
          Alert.alert('Success', 'Payment completed successfully!');
        } else {
          Alert.alert('Error', 'Payment verification failed');
        }
      } else {
        Alert.alert('Error', 'Payment was not successful');
      }
    } catch (error) {
      console.error('Payment error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <StripeProvider
      publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''}
      urlScheme='your-app-scheme'
    >
      <SafeAreaView style={styles.safeArea} edges={[]}>
        <StatusBar barStyle='dark-content' />
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <Ionicons name='lock-closed' size={24} color='#5469d4' />
            <Text style={styles.headerText}>Secure Payment</Text>
          </View>

          {/* Order Summary */}
          <View style={styles.orderSummary}>
            <Text style={styles.sectionTitle}>Order Summary</Text>

            {items.map((item) => (
              <View key={item.id} style={styles.orderItem}>
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item.clothing.name}</Text>
                  <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
                  {item.customizations.length > 0 && (
                    <View style={styles.customizationsList}>
                      <Text style={styles.customizationsHeader}>Customizations:</Text>
                      {item.customizations.map((customization, index) => (
                        <Text key={index} style={styles.customizationItem}>
                          • {customization.name}: {customization.optionName}
                        </Text>
                      ))}
                    </View>
                  )}
                </View>
                <Text style={styles.itemPrice}>{formatCurrency(item.totalPrice)}</Text>
              </View>
            ))}

            <View style={styles.divider} />

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>{formatCurrency(subtotal)}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tax</Text>
              <Text style={styles.summaryValue}>{formatCurrency(tax)}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Shipping</Text>
              <Text style={styles.summaryValue}>
                {shipping === 0 ? 'FREE' : formatCurrency(shipping)}
              </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>{formatCurrency(total)}</Text>
            </View>
          </View>

          {/* Payment Details */}
          <View style={styles.paymentSection}>
            <Text style={styles.sectionTitle}>Payment Details</Text>

            <CardField
              postalCodeEnabled={true}
              placeholders={{
                number: '4242 4242 4242 4242',
              }}
              cardStyle={styles.card}
              style={styles.cardContainer}
              onCardChange={(details) => setCardDetails(details)}
            />

            <View style={styles.securityNote}>
              <Ionicons name='shield-checkmark' size={16} color='#666' />
              <Text style={styles.securityText}>
                Your payment information is encrypted and secure
              </Text>
            </View>
          </View>

          {/* Pay Button */}
          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handlePayment}
            disabled={loading || !cardDetails?.complete}
          >
            {loading ? (
              <ActivityIndicator color='#fff' />
            ) : (
              <View style={styles.buttonContent}>
                <Text style={styles.buttonText}>Pay {formatCurrency(total)}</Text>
                <Ionicons name='arrow-forward' size={20} color='#fff' />
              </View>
            )}
          </TouchableOpacity>

          {/* Test Mode Notice */}
          {process.env.NODE_ENV === 'development' && (
            <View style={styles.testNotice}>
              <Ionicons name='information-circle' size={16} color='#ff9800' />
              <Text style={styles.testText}>Test mode - Use card 4242 4242 4242 4242</Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </StripeProvider>
  );
}
