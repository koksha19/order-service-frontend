import { Component, input } from '@angular/core';
import { CartItem } from '../../../models/cart-item.model';
import { MatButton } from '@angular/material/button';
import { CartApiService } from '../../../services/cart-api.service';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-cart-item',
  imports: [MatButton],
  templateUrl: './cart-item.component.html',
  standalone: true,
  styleUrl: '../../order/order/order.component.css',
})
export class CartItemComponent {
  cartItem = input.required<CartItem>();

  constructor(
    private cartApiService: CartApiService,
    private cartService: CartService
  ) {}

  public removeCartItem() {
    this.cartApiService
      .removeFromCart(this.cartItem().product._id as string)
      .subscribe((response) => {
        console.log(response);
        this.cartService.removeFromCart(response.productId);
      });
  }
}
