import { Component, OnInit } from '@angular/core';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { CartItem } from '../../../models/cart-item.model';
import { CartService } from '../../../services/cart.service';
import { CartApiService } from '../../../services/cart-api.service';
import { MatButton } from '@angular/material/button';
import { OrderService } from '../../../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CartItemComponent, AsyncPipe, NgForOf, MatButton, NgIf],
  templateUrl: './cart.component.html',
  styleUrl: '../../order/order-list/order-list.component.css',
  standalone: true,
})
export class CartComponent implements OnInit {
  public cart$: Observable<CartItem[]>;

  constructor(
    private cartService: CartService,
    private cartApiService: CartApiService,
    private orderService: OrderService,
    private router: Router
  ) {
    this.cart$ = this.cartService.cart$;
  }

  ngOnInit() {
    this.cartApiService.getCart().subscribe((cart) => {
      console.log(cart);
      this.cartService.setCart(cart.items);
    });
  }

  public createOrder() {
    this.orderService.createOrder().subscribe({
      next: async () => {
        await this.router.navigate(['/orders']);
      },
      error: (err) => {
        console.error('Failed creating an order:', err);
      },
    });
  }
}
