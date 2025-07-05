export interface Clothing {
  id: string;
  name: string;
  description: string;
  price: number;
  colors: string[];
  filter: string[]; // Add this new field
  mediaUrl: string;
  updatedAt?: string;
}

export type CreateClothingDTO = Omit<Clothing, 'id'>;
export type UpdateClothingDTO = Partial<Clothing>;
