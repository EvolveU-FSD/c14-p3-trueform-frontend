// src/types/navigation.ts
export type RootStackParamList = {
  Home: undefined;
  Category: { slug: string };
  ItemDetails: { itemId: string };
  Customization: undefined;
  CustomizationOption: {
    category: string;
    productType: string;
  };
};
