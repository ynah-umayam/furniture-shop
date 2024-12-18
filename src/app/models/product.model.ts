export interface Product {
  type: string;
  name: string;
  price: number;
  mainImage: string;
  productImages: any[];
  priority: number;
  productId: string;
  description: string;
  rating: number;
  reviewCount: number;
  stock: number;
  count?: number;
}
