import React, { useState } from 'react';
import { Platform } from 'react-native';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY as string);

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement) as any,
    });

    if (error) {
      setError(error.message || 'An error occurred');
      setProcessing(false);
    } else {
      try {
        const { data } = await axios.post('/api/payment/create-payment-intent', {
          amount: 1000,
          currency: 'usd',
        });
        const { clientSecret } = data;

        const { error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: paymentMethod.id,
        });

        if (confirmError) {
          setError(confirmError.message || 'An error occurred');
        } else {
          setError(null);
          customAlert('Payment successful!');
        }
      } catch (err: any) {
        setError(err.message || 'An error occurred');
      }
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button type='submit' disabled={!stripe || processing}>
        {processing ? 'Processing...' : 'Pay'}
      </button>
    </form>
  );
};

const customAlert = (message: string) => {
  console.log(message);
};

const PaymentPage = () => {
  if (Platform.OS === 'web') {
    return (
      <div>
        <h1>Payment Page</h1>
        <Elements stripe={stripePromise}>
          <PaymentForm />
        </Elements>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Payment Page</h1>
        <p>Stripe payment is not supported on this platform.</p>
      </div>
    );
  }
};

export default PaymentPage;
