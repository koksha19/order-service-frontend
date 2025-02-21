import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { Delivery } from '../models/delivery.model';
import { CartItem } from '../models/cart-item.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartApiService {
  private apiUrl = environment.domain;
  private endpoints = {
    cart: 'cart/',
  };

  constructor(private http: HttpClient) {}

  public getCart(): Observable<{ message: string; items: CartItem[] }> {
    return this.http.get<{ message: string; items: CartItem[] }>(
      this.apiUrl + this.endpoints.cart
    );
  }

  public addToCart(
    product: Product,
    delivery: Delivery,
    quantity: number,
    price: number
  ): Observable<{
    message: string;
    info: {
      product: Product;
      delivery: Delivery;
      quantity: number;
      price: number;
    };
  }> {
    const request = {
      product: product,
      delivery: delivery,
      quantity: quantity,
      price: price,
    };
    console.log(request);
    return this.http.post<{
      message: string;
      info: {
        product: Product;
        delivery: Delivery;
        quantity: number;
        price: number;
      };
    }>(this.apiUrl + this.endpoints.cart, request);
  }

  public removeFromCart(
    productId: string
  ): Observable<{ message: string; productId: string }> {
    return this.http.put<{ message: string; productId: string }>(
      this.apiUrl + this.endpoints.cart + productId,
      productId
    );
  }
}
