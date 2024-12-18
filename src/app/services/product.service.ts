import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { Product } from "../models";
import { MOCK_DATA } from "../mocks/mock-data";

@Injectable({ providedIn: "root" })
export class ProductService {
  private selectedProducts$ = new BehaviorSubject<Product[]>([]);

  addProductToCart(product: Product, count: number): void {
    const selectedProducts = this.selectedProducts$.getValue();
    this.selectedProducts$.next([...selectedProducts, { ...product, count }]);
  }

  getProductsInCart$(): Observable<Product[]> {
    return this.selectedProducts$.asObservable();
  }

  getProducts$(): Observable<Product[]> {
    const processedProducts: Product[] = MOCK_DATA.map((data) => ({
      type: data.type,
      name: data.name,
      price: data.price,
      mainImage: data.main_image,
      productImages: data.product_images,
      priority: data.priority,
      productId: data.product_id,
      description: data.description,
      rating: data.rating,
      reviewCount: data.review_count,
      stock: data.stock,
    }));
    return of(processedProducts);
  }

  removeProduct(productId: string): void {
    const selectedProducts = this.selectedProducts$.getValue();
    const updatedProducts = selectedProducts.filter(
      (product) => product.productId !== productId
    );
    this.selectedProducts$.next(updatedProducts);
  }

  resetProductsInCart(): void {
    this.selectedProducts$.next([]);
  }
}
