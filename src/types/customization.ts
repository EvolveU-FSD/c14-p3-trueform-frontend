export type ClothingType = 'SHIRT' | 'PANTS' | 'JACKET';

export interface CustomizationOption {
  id: string;
  name: string;
  imageUrl: string;
  sortOrder: number;
  description?: string;
  priceModifier?: number;
}

export interface ConditionalOn {
  type: string;
  value: string;
}

export interface Customization {
  id: string;
  name: string;
  clothingType: ClothingType;
  type: string;
  required: boolean;
  options: CustomizationOption[];
  sortOrder: number;
  description?: string;
  defaultValue?: string;
  priceModifier?: number;
  conditionalOn?: ConditionalOn;
}
