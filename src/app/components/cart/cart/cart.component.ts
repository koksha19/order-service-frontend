import { Component, OnInit } from '@angular/core';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { AsyncPipe, NgForOf } from '@angular/common';
import { Observable } from 'rxjs';
import { CartItem } from '../../../models/cart-item.model';
import { CartService } from '../../../services/cart.service';
import { CartApiService } from '../../../services/cart-api.service';

@Component({
  selector: 'app-cart',
  imports: [CartItemComponent, AsyncPipe, NgForOf],
  templateUrl: './cart.component.html',
  styleUrl: '../../order/order-list/order-list.component.css',
  standalone: true,
})
export class CartComponent implements OnInit {
  public cart$: Observable<CartItem[]>;

  constructor(
    private cartService: CartService,
    private cartApiService: CartApiService
  ) {
    this.cart$ = this.cartService.cart$;
  }

  ngOnInit() {
    this.cartApiService.getCart().subscribe((cart) => {
      console.log(cart);
      this.cartService.setCart(cart.items);
    });
  }
}
