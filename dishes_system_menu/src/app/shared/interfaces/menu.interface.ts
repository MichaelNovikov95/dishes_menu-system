export interface Dish {
  id?: string;
  name: string;
  price: number;
  image?: string | File;
  category: string;
  categoryId?: number;
  description?: string;
  featured: boolean;
}
