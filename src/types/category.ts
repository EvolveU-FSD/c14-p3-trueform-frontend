export interface Category {
  id: string;
  name: string;
  description: string;
  slug: string;
  imageUrl?: string;
}

export type CreateCategoryDTO = Omit<Category, 'id'>;
export type UpdateCategoryDTO = Partial<Category>;
