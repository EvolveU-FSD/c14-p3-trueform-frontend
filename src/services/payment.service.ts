import {
  CreatePaymentIntentRequest,
  PaymentIntentResponse,
  VerifyPaymentRequest,
  PaymentVerificationResponse,
} from '../types/payment.types';
import { apiService } from './api.service';

export class PaymentService {
  private static readonly endpoint = '/payment';

  static async createPaymentIntent(
    data: CreatePaymentIntentRequest,
  ): Promise<PaymentIntentResponse | null> {
    try {
      const response = await apiService.post<PaymentIntentResponse, CreatePaymentIntentRequest>(
        `${this.endpoint}/create-intent`,
        data,
      );
      return response.data ?? null;
    } catch (error) {
      console.error('Failed to create payment intent:', error);
      return null;
    }
  }

  static async verifyPayment(
    data: VerifyPaymentRequest,
  ): Promise<PaymentVerificationResponse | null> {
    try {
      const response = await apiService.post<PaymentVerificationResponse, VerifyPaymentRequest>(
        `${this.endpoint}/verify`,
        data,
      );
      return response.data ?? null;
    } catch (error) {
      console.error('Failed to verify payment:', error);
      return null;
    }
  }
}
