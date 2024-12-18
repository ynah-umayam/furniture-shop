import { Component, OnDestroy, OnInit } from "@angular/core";
import { ProductService } from "../../services";
import { Subscriber, Subscription, filter } from "rxjs";
import { Router } from "@angular/router";
import { Product } from "../../models";

@Component({
  selector: "app-cart-detail",
  templateUrl: "./cart-detail.component.html",
  styleUrl: "./cart-detail.component.css",
})
export class CartDetailComponent implements OnInit, OnDestroy {
  selectedProducts: Product[];
  total: number;
  isSuccess = false;

  private subscriptions = new Subscription();

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.productService
        .getProductsInCart$()
        .pipe(filter((products) => !!products))
        .subscribe((products) => {
          this.selectedProducts = products;
          this.updateTotal();
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  trackById(index: number, item: Product): number {
    return parseInt(item.productId);
  }

  goBack(): void {
    this.router.navigateByUrl("/main");
  }

  updateCount(counter: number, product: Product): void {
    const selectedProduct = this.selectedProducts.find(
      (sp) => sp.productId === product.productId
    );

    if (selectedProduct) {
      selectedProduct.count = counter;
    }
    this.updateTotal();
  }

  updateTotal(): void {
    this.total = this.selectedProducts.reduce((a, b) => {
      const count = b.count ?? 0;
      const price = b.price ?? 0;
      return a + price * count;
    }, 0);
  }

  removeProduct(product: Product): void {
    this.productService.removeProduct(product.productId);
  }

  checkout(): void {
    this.isSuccess = true;
    this.productService.resetProductsInCart();
  }
}
