import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import {
  LoginComponet,
  LogoComponent,
  SignUpComponent,
  IconComponent,
  MainComponent,
  ProductDetailComponent,
  CartDetailComponent,
  CounterComponent,
} from "./components";
import { AppRoutingModule } from "./app.routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { PrependZeroPipe } from "./utils";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponet,
    SignUpComponent,
    LogoComponent,
    MainComponent,
    IconComponent,
    ProductDetailComponent,
    CartDetailComponent,
    CounterComponent,
    PrependZeroPipe,
  ],
  imports: [BrowserModule, ReactiveFormsModule, AppRoutingModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
