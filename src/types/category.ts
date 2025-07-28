export interface Category {
  id: string;
  name: string;
  slug: string;
  clothingType: 'SHIRT' | 'PANTS' | 'JACKET';
  sortOrder: number;
  description?: string;
  imageUrl?: string;
  mediaUrl?: string; // Add the new mediaUrl field
}

export type CreateCategoryDTO = Omit<Category, 'id'>;
export type UpdateCategoryDTO = Partial<Category>;
