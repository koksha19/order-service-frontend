import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { Delivery } from '../models/delivery.model';
import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root',
})
export class CartApiService {
  private apiUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient) {}

  public getCart(): Observable<{ message: string; items: CartItem[] }> {
    return this.http.get<{ message: string; items: CartItem[] }>(
      this.apiUrl + 'cart'
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
    }>(this.apiUrl + 'cart', request);
  }
}
