import { Component } from "@angular/core";
import { ProductService } from "../../services";
import { Router } from "@angular/router";
import { Product } from "../../models";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrl: "./product-detail.component.css",
})
export class ProductDetailComponent {
  selectedProduct: Product;
  counter = 0;
  constructor(private productService: ProductService, private router: Router) {
    this.selectedProduct =
      this.router.getCurrentNavigation().extras.state["product"];
  }

  addCount(counter: number): void {
    this.counter = counter;
  }

  reduceCount(counter: number): void {
    this.counter = counter;
  }

  addToCart(): void {
    this.productService.addProductToCart(this.selectedProduct, this.counter);
    this.router.navigateByUrl("/main");
  }
}
