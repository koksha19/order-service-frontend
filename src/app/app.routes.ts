import { Routes } from '@angular/router';
import {OrderListComponent} from './components/order/order-list/order-list.component';
import {HomeComponent} from './components/home/home.component';
import {ProductListComponent} from './components/product/product-list/product-list.component';
import {ProductDetailComponent} from './components/product/product-detail/product-detail.component';
import {SignupComponent} from './components/auth/signup/signup.component';
import {LoginComponent} from './components/auth/login/login.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'orders', component: OrderListComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'products/:id', component: ProductDetailComponent },
];
