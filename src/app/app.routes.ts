import { Routes } from '@angular/router';
import { OrderListComponent } from './components/order/order-list/order-list.component';
import { HomeComponent } from './components/home/home.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { ProductDetailComponent } from './components/product/product-detail/product-detail.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ProductEditComponent } from './components/product/product-edit/product-edit.component';
import { AuthGuard } from './services/auth-guard.service';
import { CartComponent } from './components/cart/cart/cart.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'orders', component: OrderListComponent, canActivate: [AuthGuard] },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin/add-product',
    component: ProductEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/products',
    component: ProductListComponent,
    canActivate: [AuthGuard],
  },
  { path: 'products/:id', component: ProductDetailComponent },
  {
    path: 'admin/edit-product/:id',
    component: ProductEditComponent,
    canActivate: [AuthGuard],
  },
];
