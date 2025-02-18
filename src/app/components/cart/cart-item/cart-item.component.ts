import { Component, input } from '@angular/core';
import { CartItem } from '../../../models/cart-item.model';
import { AsyncPipe, NgForOf } from '@angular/common';

@Component({
  selector: 'app-cart-item',
  imports: [AsyncPipe, NgForOf],
  templateUrl: './cart-item.component.html',
  standalone: true,
  styleUrl: '../../order/order/order.component.css',
})
export class CartItemComponent {
  cartItem = input.required<CartItem>();
}
