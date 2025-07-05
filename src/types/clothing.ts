export interface Clothing {
  id: string;
  name: string;
  description: string;
  price: number;
  colors: string[];
  mediaUrl: string;
  updatedAt: string; // ISO date string
}

export type CreateClothingDTO = Omit<Clothing, 'id'>;
export type UpdateClothingDTO = Partial<Clothing>;
