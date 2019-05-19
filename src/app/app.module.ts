import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageLoginComponent } from './pages/page-login/page-login.component';
import { PageMainComponent } from './pages/page-main/page-main.component';
import { PageCategoriesComponent } from './pages/page-categories/page-categories.component';
import { PageProductsComponent } from './pages/page-products/page-products.component';
import { PageBasketComponent } from './pages/page-basket/page-basket.component';
import { PageAdminComponent } from './pages/page-admin/page-admin.component';
import { PageProductComponent } from './pages/page-product/page-product.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SliderComponent } from './components/slider/slider.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import {AuthService} from './shared/services/auth.service';
import {ProviderService} from './shared/services/provider.service';
import {AuthGuard} from './shared/services/auth.guard';
import {HttpClientModule} from '@angular/common/http';
import { PageProductsService } from './pages/page-products/page-products.service';
import { ProductsManagerComponent } from './pages/admin/products-manager/products-manager.component';
import { OrdersManagerComponent } from './pages/admin/orders-manager/orders-manager.component';

@NgModule({
  declarations: [
    AppComponent,
    PageLoginComponent,
    PageMainComponent,
    PageCategoriesComponent,
    PageProductsComponent,
    PageBasketComponent,
    PageAdminComponent,
    PageProductComponent,
    NavbarComponent,
    SliderComponent,
    FooterComponent,
    ProductsManagerComponent,
    OrdersManagerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    ProviderService,
    AuthService,
    AuthGuard,
    PageProductsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
