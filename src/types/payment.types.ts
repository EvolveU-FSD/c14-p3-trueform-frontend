export interface CreatePaymentIntentRequest {
  amount: number;
  currency: string;
  orderItems?: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
  }>;
}

export interface PaymentIntentResponse {
  clientSecret: string;
  paymentIntentId: string;
}

export interface VerifyPaymentRequest {
  paymentIntentId: string;
}

export interface PaymentVerificationResponse {
  success: boolean;
  paymentIntent?: {
    id: string;
    status: string;
    amount: number;
    currency: string;
  };
  order?: {
    id: string;
    status: string;
  };
}
