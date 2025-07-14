export interface Clothing {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  colors: string[];
  filter: string[];
  mediaUrl: string;
  updatedAt?: string;
}

export type CreateClothingDTO = Omit<Clothing, 'id'>;
export type UpdateClothingDTO = Partial<Clothing>;
