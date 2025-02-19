import { Component, input } from '@angular/core';
import { Order } from '../../../models/order.model';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-order',
  imports: [AsyncPipe, NgForOf, NgIf],
  templateUrl: './order.component.html',
  standalone: true,
  styleUrl: './order.component.css',
})
export class OrderComponent {
  order = input.required<Order>();

  get totalPrice(): number {
    return this.order().products.reduce((sum, productItem) => {
      return (
        sum +
        productItem.product.price * productItem.quantity +
        productItem.delivery.price
      );
    }, 0);
  }
}
