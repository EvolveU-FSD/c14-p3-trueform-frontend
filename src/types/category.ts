export interface Category {
  id: string;
  name: string;
  description?: string;
  slug: string;
  imageUrl?: string;
  clothingType: 'SHIRT' | 'PANTS' | 'JACKET'; // Add supported clothing types
  sortOrder: number;
}

export type CreateCategoryDTO = Omit<Category, 'id'>;
export type UpdateCategoryDTO = Partial<Category>;
