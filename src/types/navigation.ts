import { CustomizationOption } from './customization';

// src/types/navigation.ts
export type RootStackParamList = {
  Home: undefined;
  Category: { slug: string };
  ItemDetails: { itemId: string };
  Customization: {
    itemId: string;
  };
  CustomizationOption: {
    itemId: string;
    category: string;
    options: CustomizationOption[];
  };
};
