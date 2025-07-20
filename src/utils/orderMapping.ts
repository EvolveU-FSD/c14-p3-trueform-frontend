import { CartItem } from '../types/context/cart.types';
import { Address } from '../types/address.types';
import {
  CreateOrderItemDTO,
  CreateOrderAddressDTO,
  CreateOrderMeasurementDTO,
} from '../types/order.types';
import { CreateMeasurementDTO } from '../types/measurement.types';

export function mapCartItemToOrderItem(item: CartItem): CreateOrderItemDTO {
  return {
    productId: item.clothing.id,
    quantity: item.quantity,
    price: item.totalPrice,
    customizations: item.customizations.map((c) => ({
      customizationId: c.customizationId,
      optionId: c.optionId,
      name: c.name,
      optionName: c.optionName,
      mediaUrl: c.mediaUrl,
      priceModifier: c.priceModifier,
    })),
  };
}

export function mapAddressToOrderAddress(address: Partial<Address>): CreateOrderAddressDTO {
  return {
    firstName: address.firstName || '',
    lastName: address.lastName || '',
    company: address.company,
    address1: address.address1 || '',
    address2: address.address2,
    city: address.city || '',
    state: address.state || '',
    zipCode: address.zipCode || '',
    country: address.country || '',
    phone: address.phone,
  };
}

export function mapMeasurementToOrderMeasurement(
  measurement: Partial<CreateMeasurementDTO>,
): CreateOrderMeasurementDTO {
  return {
    values: measurement.values || {},
    unit: measurement.unit || 'INCHES',
    source: measurement.standardType === 'SCAN' ? 'BODY_SCAN' : 'MANUAL',
  };
}
