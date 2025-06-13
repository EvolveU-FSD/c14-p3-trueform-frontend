export interface Clothing {
    id: string;
    name: string;
    description: string;
    price: number;
    categoryId: string;
    sizes: string[];
    colors: string[];
    imageUrl: string;
}

export type CreateClothingDTO = Omit<Clothing, 'id'>;
export type UpdateClothingDTO = Partial<Clothing>;
