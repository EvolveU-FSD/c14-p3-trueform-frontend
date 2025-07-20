import { ApiResponse } from '../types/api';
import {
  Order,
  CreateOrderDTO,
  UpdateOrderStatusDTO,
  OrderItem,
  UpdateOrderItemDTO,
  OrderItemCustomization,
  UpdateOrderCustomizationDTO,
  OrderMeasurement,
  CreateOrderMeasurementDTO,
  OrderAddress,
  UpdateOrderAddressDTO,
  CreatePaymentIntentDTO,
  VerifyPaymentDTO,
} from '../types/order.types';
import { apiService } from './api.service';

export class OrderService {
  private static readonly endpoint = '/order';

  // Order CRUD Operations
  static async getAll(): Promise<Order[]> {
    try {
      const response = await apiService.get<Order[]>(this.endpoint);
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      return [];
    }
  }

  static async getById(id: string): Promise<Order | null> {
    try {
      const response = await apiService.get<Order>(`${this.endpoint}/${id}`);
      return response.data ?? null;
    } catch (error) {
      console.error(`Failed to fetch order with ID ${id}:`, error);
      return null;
    }
  }

  static async getByCustomerId(customerId: string): Promise<Order[]> {
    try {
      const response = await apiService.get<Order[]>(`${this.endpoint}/customer/${customerId}`);
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error(`Failed to fetch orders for customer ${customerId}:`, error);
      return [];
    }
  }

  static async create(data: CreateOrderDTO): Promise<Order | null> {
    try {
      const response = await apiService.post<Order, CreateOrderDTO>(this.endpoint, data);
      return response.data ?? null;
    } catch (error) {
      console.error('Failed to create order:', error);
      return null;
    }
  }

  static async updateStatus(id: string, data: UpdateOrderStatusDTO): Promise<Order | null> {
    try {
      const response = await apiService.put<Order, UpdateOrderStatusDTO>(
        `${this.endpoint}/${id}/status`,
        data,
      );
      return response.data ?? null;
    } catch (error) {
      console.error(`Failed to update order status for ID ${id}:`, error);
      return null;
    }
  }

  static async cancel(id: string): Promise<Order | null> {
    try {
      const response = await apiService.put<Order, Record<string, never>>(
        `${this.endpoint}/${id}/cancel`,
        {},
      );
      return response.data ?? null;
    } catch (error) {
      console.error(`Failed to cancel order with ID ${id}:`, error);
      return null;
    }
  }

  static async delete(id: string): Promise<boolean> {
    try {
      await apiService.delete<ApiResponse<void>>(`${this.endpoint}/${id}`);
      return true;
    } catch (error) {
      console.error(`Failed to delete order with ID ${id}:`, error);
      return false;
    }
  }

  // Order Item Operations
  static async updateOrderItem(id: string, data: UpdateOrderItemDTO): Promise<OrderItem | null> {
    try {
      const response = await apiService.put<OrderItem, UpdateOrderItemDTO>(
        `${this.endpoint}/item/${id}`,
        data,
      );
      return response.data ?? null;
    } catch (error) {
      console.error(`Failed to update order item with ID ${id}:`, error);
      return null;
    }
  }

  static async deleteOrderItem(id: string): Promise<boolean> {
    try {
      await apiService.delete<void>(`${this.endpoint}/item/${id}`);
      return true;
    } catch (error) {
      console.error(`Failed to delete order item with ID ${id}:`, error);
      return false;
    }
  }

  // Order Customization Operations
  static async updateOrderCustomization(
    id: string,
    data: UpdateOrderCustomizationDTO,
  ): Promise<OrderItemCustomization | null> {
    try {
      const response = await apiService.put<OrderItemCustomization, UpdateOrderCustomizationDTO>(
        `${this.endpoint}/customization/${id}`,
        data,
      );
      return response.data ?? null;
    } catch (error) {
      console.error(`Failed to update order customization with ID ${id}:`, error);
      return null;
    }
  }

  // Order Measurement Operations
  static async addOrderMeasurement(
    orderId: string,
    data: CreateOrderMeasurementDTO,
  ): Promise<OrderMeasurement | null> {
    try {
      const response = await apiService.post<OrderMeasurement, CreateOrderMeasurementDTO>(
        `${this.endpoint}/${orderId}/measurement`,
        data,
      );
      return response.data ?? null;
    } catch (error) {
      console.error(`Failed to add measurement to order ${orderId}:`, error);
      return null;
    }
  }

  // Order Address Operations
  static async updateShippingAddress(
    orderId: string,
    data: UpdateOrderAddressDTO,
  ): Promise<OrderAddress | null> {
    try {
      const response = await apiService.put<OrderAddress, UpdateOrderAddressDTO>(
        `${this.endpoint}/${orderId}/shipping-address`,
        data,
      );
      return response.data ?? null;
    } catch (error) {
      console.error(`Failed to update shipping address for order ${orderId}:`, error);
      return null;
    }
  }

  static async updateBillingAddress(
    orderId: string,
    data: UpdateOrderAddressDTO,
  ): Promise<OrderAddress | null> {
    try {
      const response = await apiService.put<OrderAddress, UpdateOrderAddressDTO>(
        `${this.endpoint}/${orderId}/billing-address`,
        data,
      );
      return response.data ?? null;
    } catch (error) {
      console.error(`Failed to update billing address for order ${orderId}:`, error);
      return null;
    }
  }

  // Payment Operations
  static async createPaymentIntent(
    orderId: string,
    data: CreatePaymentIntentDTO,
  ): Promise<{ clientSecret: string; paymentIntentId: string } | null> {
    try {
      const response = await apiService.post<
        { clientSecret: string; paymentIntentId: string },
        CreatePaymentIntentDTO
      >(`${this.endpoint}/${orderId}/payment-intent`, data);
      return response.data ?? null;
    } catch (error) {
      console.error(`Failed to create payment intent for order ${orderId}:`, error);
      return null;
    }
  }

  static async verifyPayment(orderId: string, data: VerifyPaymentDTO): Promise<Order | null> {
    try {
      const response = await apiService.post<Order, VerifyPaymentDTO>(
        `${this.endpoint}/${orderId}/verify-payment`,
        data,
      );
      return response.data ?? null;
    } catch (error) {
      console.error(`Failed to verify payment for order ${orderId}:`, error);
      return null;
    }
  }
}
