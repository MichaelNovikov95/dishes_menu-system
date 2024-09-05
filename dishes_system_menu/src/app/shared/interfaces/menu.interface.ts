export interface Dish {
  id?: string;
  name: string;
  price: number;
  image?: string | File;
  category: string;
  description?: string;
  featured: boolean;
}
