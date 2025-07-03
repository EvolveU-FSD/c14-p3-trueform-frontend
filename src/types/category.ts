export interface Category {
  id: string;
  name: string;
  slug: string;
  clothingType: 'SHIRT' | 'PANTS' | 'JACKET'; // Add supported clothing types
  sortOrder: number;
  description?: string;
  imageUrl?: string;
}

export type CreateCategoryDTO = Omit<Category, 'id'>;
export type UpdateCategoryDTO = Partial<Category>;
