export interface CustomizationOption {
  id: string;
  title: string;
  imageUrl: string;
  description?: string;
  productType: string;
  sortOrder: number;
  category: string;
}

export interface CustomizationCategory {
  id: string;
  name: string;
  sortOrder: number;
  options: CustomizationOption[];
}
