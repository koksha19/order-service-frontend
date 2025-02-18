import { Component } from '@angular/core';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { AsyncPipe, NgForOf } from '@angular/common';
import { OrderComponent } from '../../order/order/order.component';
import { Observable } from 'rxjs';
import { CartItem } from '../../../models/cart-item.model';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-cart',
  imports: [CartItemComponent, AsyncPipe, NgForOf, OrderComponent],
  templateUrl: './cart.component.html',
  styleUrl: '../../order/order-list/order-list.component.css',
  standalone: true,
})
export class CartComponent {
  public cart$: Observable<CartItem[]>;

  constructor(private cartService: CartService) {
    this.cart$ = this.cartService.cart$;
  }
}
