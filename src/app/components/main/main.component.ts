import { Component, OnDestroy, OnInit } from "@angular/core";
import { ProductService } from "../../services";
import { Subscriber, filter } from "rxjs";
import { Router } from "@angular/router";
import { Product } from "../../models";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrl: "./main.component.css",
})
export class MainComponent implements OnInit, OnDestroy {
  products: Product[];
  categoryList = [
    { label: "Popular", value: "popular", icon: "star" },
    { label: "Chair", value: "chair", icon: "chair" },
    { label: "Table", value: "table", icon: "table" },
    { label: "Armchair", value: "armchair", icon: "armchair" },
    { label: "Bed", value: "bed", icon: "bed" },
  ];
  activeFilter: string = "popular";
  filteredProducts = [];
  isListEven = false;
  productsInCart = [];
  cartCount = 0;

  private subscriptions = new Subscriber();

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.productService
        .getProducts$()
        .pipe(filter((products) => !!products))
        .subscribe((products) => {
          this.products = products;
          this.filter(this.activeFilter);
        })
    );

    this.subscriptions.add(
      this.productService.getProductsInCart$().subscribe((products) => {
        this.productsInCart = products;
        this.cartCount = products.reduce((a, b) => a + b.count, 0);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  filter(keyword: string): void {
    this.activeFilter = keyword;
    if (keyword !== "popular") {
      this.filteredProducts = this.products.filter(
        (product) => product.type === this.activeFilter
      );
    } else {
      this.filteredProducts = this.products.filter(
        (product) => product.rating >= 4
      );
    }

    this.filteredProducts.sort((a, b) => a.priority - b.priority);
    const totalCount = this.filteredProducts.length;
    this.isListEven = totalCount % 2 === 0;
  }

  trackById(index: number, item: Product): number {
    return parseInt(item.productId);
  }

  goToProductDetail(product: any): void {
    this.router.navigateByUrl("/product-detail", { state: { product } });
  }

  goToCartDetail(): void {
    this.router.navigateByUrl("/cart-detail");
  }
}
