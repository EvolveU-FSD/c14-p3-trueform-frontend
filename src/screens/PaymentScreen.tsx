import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { StripeProvider, CardField, useStripe } from '@stripe/stripe-react-native';
import type { CardFieldInput } from '@stripe/stripe-react-native';
import { showAlert } from 'utils/showAlerts';

// Replace with your backend API URL
const API_URL = 'http://10.0.0.183:4000/api';

const PaymentScreen = () => {
  const [cardDetails, setCardDetails] = useState<CardFieldInput.Details | null>(null);
  const [loading, setLoading] = useState(false);
  const { confirmPayment } = useStripe();

  const handlePayment = async () => {
    if (!cardDetails?.complete) {
      Alert.alert('Error', 'Please enter complete card details');
      return;
    }

    try {
      setLoading(true);
      
      // Step 1: Create payment intent on your backend
      console.log('api url', API_URL);
      const response = await fetch(`${API_URL}/payment/create-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 1000, // Amount in cents (e.g., $10.00)
          currency: 'usd',
        }),
      });
      const { clientSecret } = await response.json();
      console.log('clientSecret', clientSecret);
      if (!clientSecret) {
        throw new Error('Failed to create payment intent');
      }

      // Step 2: Confirm the payment on the client
      const { paymentIntent, error } = await confirmPayment(clientSecret, {
        paymentMethodType: 'Card',
      });
      console.log('paymentIntent', paymentIntent);
      console.log('error', error);
      if (error) {
        showAlert('Error', error.message);
        return;
      }

      if (paymentIntent?.status === 'Succeeded') {
        // Step 3: Verify payment on your backend
        const verifyResponse = await fetch(`${API_URL}/payment/verify`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            paymentIntentId: paymentIntent.id,
          }),
        });

        const verifyResult = await verifyResponse.json();

        if (verifyResult.success) {
          Alert.alert('Success', 'Payment completed successfully!');
          // Navigate to success screen or update UI
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
      urlScheme="your-app-scheme" // Required for 3D Secure
    >
      <View style={styles.container}>
        <Text style={styles.title}>Payment Details</Text>
        
        <CardField
          postalCodeEnabled={true}
          placeholders={{
            number: '4242 4242 4242 4242',
          }}
          cardStyle={styles.card}
          style={styles.cardContainer}
          onCardChange={(details) => setCardDetails(details)}
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handlePayment}
          disabled={loading || !cardDetails?.complete}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Pay Now</Text>
          )}
        </TouchableOpacity>
      </View>
    </StripeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  cardContainer: {
    height: 50,
    marginVertical: 30,
  },
  card: {
    backgroundColor: '#FFFFFF',
    textColor: '#000000',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#5469d4',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: '#a0a0a0',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PaymentScreen;