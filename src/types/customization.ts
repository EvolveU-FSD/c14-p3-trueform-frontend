export type ClothingType = 'SHIRT' | 'PANTS' | 'JACKET';

export interface CustomizationOption {
  id: string;
  name: string;
  description?: string;
  imageUrl: string;
  priceModifier?: number;
  sortOrder: number;
}

export interface ConditionalOn {
  type: string;
  value: string;
}

export interface Customization {
  name: string;
  clothingType: ClothingType;
  description?: string;
  type: string;
  required: boolean;
  options: CustomizationOption[];
  defaultValue?: string;
  sortOrder: number;
  priceModifier?: number;
  conditionalOn?: ConditionalOn;
}
