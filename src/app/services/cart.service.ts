import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { CartItem } from '../models/cart-item.model';
import { CartApiService } from './cart-api.service';
import { Product } from '../models/product.model';
import { Delivery } from '../models/delivery.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly _cart$: BehaviorSubject<CartItem[]> = new BehaviorSubject<
    CartItem[]
  >([]);
  public readonly cart$ = this._cart$.asObservable();

  constructor(private cartApiService: CartApiService) {}

  get cart(): CartItem[] {
    return this._cart$.getValue();
  }

  private set cart(cart: CartItem[]) {
    this._cart$.next(cart);
  }

  public setCart(cart: CartItem[]): void {
    this.cart = cart;
  }

  public removeFromCart(productId: string): void {
    const index = this.cart.findIndex((item) => item.product._id === productId);
    this.cart.splice(index, 1);
  }

  public addToCart(
    product: Product,
    delivery: Delivery,
    quantity: number,
    price: number
  ): Observable<{
    info: {
      product: Product;
      delivery: Delivery;
      quantity: number;
      price: number;
    };
  }> {
    return this.cartApiService
      .addToCart(product, delivery, quantity, price)
      .pipe(
        tap((response) => {
          console.log(response);
          this.cart = [...this.cart, response.info];
        })
      );
  }
}
