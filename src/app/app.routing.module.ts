import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {
  LoginComponet,
  SignUpComponent,
  MainComponent,
  ProductDetailComponent,
  CartDetailComponent,
} from "./components";

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponet },
  { path: "sign-up", component: SignUpComponent },
  { path: "main", component: MainComponent },
  { path: "product-detail", component: ProductDetailComponent },
  { path: "cart-detail", component: CartDetailComponent },
  { path: "**", redirectTo: "login" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
