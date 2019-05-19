import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PageMainComponent} from './pages/page-main/page-main.component';
import {PageLoginComponent} from './pages/page-login/page-login.component';
import {PageAdminComponent} from './pages/page-admin/page-admin.component';
import {PageBasketComponent} from './pages/page-basket/page-basket.component';
import {PageCategoriesComponent} from './pages/page-categories/page-categories.component';
import {PageProductsComponent} from './pages/page-products/page-products.component';
import {PageProductComponent} from './pages/page-product/page-product.component';
import { AuthGuard } from './shared/services/auth.guard';
import { ProductsManagerComponent } from './pages/admin/products-manager/products-manager.component';
import { OrdersManagerComponent } from './pages/admin/orders-manager/orders-manager.component';

const routes: Routes = [
    {path: '', redirectTo: '/main', pathMatch: 'full'},
    {path: 'main', component: PageMainComponent},
    {path: 'login', component: PageLoginComponent},
    {path: 'admin', component: PageAdminComponent, canActivate: [AuthGuard], 
      children: [
        {
          path: '',
          children: [
            { path: 'products', component: ProductsManagerComponent },
            { path: 'orders', component: OrdersManagerComponent },
          ],
        }
      ]},
    {path: 'basket', component: PageBasketComponent},
    {path: 'categories', component: PageCategoriesComponent},
    {path: 'products/:category', component: PageProductsComponent},
    {path: 'product/:productId', component: PageProductComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
