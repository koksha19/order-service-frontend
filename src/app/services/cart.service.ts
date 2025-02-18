import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly _cart$: BehaviorSubject<CartItem[]> = new BehaviorSubject<
    CartItem[]
  >([
    {
      product: {
        _id: 'sdfasdf',
        title: 'First',
        price: 1000,
        description:
          'First product lfjal alfjaf skjfsa fl;ksdajf safkljaf ;aslkfjsad',
        image:
          'https://sc1.musik-produktiv.com/pic-010153533xl/suhr-custom-modern-3ts.jpg',
        stock: 4,
        delivery: [
          { name: 'Standard', price: 50, checked: false },
          { name: 'Express', price: 70, checked: false },
          { name: 'Overnight', price: 100, checked: false },
        ],
      },
      quantity: 5,
      delivery: { name: 'Express', price: 70, checked: false },
    },
  ]);
  public readonly cart$ = this._cart$.asObservable();
}
