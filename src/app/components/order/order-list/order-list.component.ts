import { Component } from '@angular/core';
import {AsyncPipe, NgForOf} from '@angular/common';
import {Observable} from 'rxjs';
import { Order } from '../../../models/order.model';
import {OrderService} from '../../../services/order.service';
import {OrderComponent} from '../order/order.component';

@Component({
  selector: 'app-order-list',
  imports: [NgForOf, AsyncPipe, OrderComponent],
  templateUrl: './order-list.component.html',
  standalone: true,
  styleUrl: './order-list.component.css'
})
export class OrderListComponent {
  public orders$: Observable<Order[]>;

  constructor(private ordersService: OrderService) {
    this.orders$ = this.ordersService.orders$;
  }
}
