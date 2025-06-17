export interface Clothing {
  id: string;
  name: string;
  description: string;
  price: number;
  colors: string[];
  imageUrl: string;
}

export type CreateClothingDTO = Omit<Clothing, 'id'>;
export type UpdateClothingDTO = Partial<Clothing>;
