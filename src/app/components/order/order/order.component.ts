import { Component, input } from '@angular/core';
import { Order } from '../../../models/order.model';
import { NgForOf } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { OrderApiService } from '../../../services/order-api.service';

@Component({
  selector: 'app-order',
  imports: [NgForOf, MatButton],
  templateUrl: './order.component.html',
  standalone: true,
  styleUrl: './order.component.css',
})
export class OrderComponent {
  order = input.required<Order>();

  constructor(private orderApiService: OrderApiService) {}

  get totalPrice(): number {
    return this.order().products.reduce((sum, productItem) => {
      return (
        sum +
        productItem.product.price * productItem.quantity +
        productItem.delivery.price
      );
    }, 0);
  }

  public downloadInvoice(orderId: string | undefined) {
    this.orderApiService
      .getInvoice(orderId as string)
      .subscribe((invoiceBlob) => {
        const invoiceUrl = URL.createObjectURL(invoiceBlob);
        window.open(invoiceUrl);
      });
  }
}
