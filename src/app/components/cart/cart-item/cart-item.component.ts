import { Component, input } from '@angular/core';
import { CartItem } from '../../../models/cart-item.model';

@Component({
  selector: 'app-cart-item',
  imports: [],
  templateUrl: './cart-item.component.html',
  standalone: true,
  styleUrl: '../../order/order/order.component.css',
})
export class CartItemComponent {
  cartItem = input.required<CartItem>();
}
