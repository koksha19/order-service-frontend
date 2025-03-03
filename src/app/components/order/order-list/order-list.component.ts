import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgForOf } from '@angular/common';
import { Observable } from 'rxjs';
import { Order } from '../../../models/order.model';
import { OrderService } from '../../../services/order.service';
import { OrderComponent } from '../order/order.component';
import { OrderApiService } from '../../../services/order-api.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-order-list',
  imports: [NgForOf, AsyncPipe, OrderComponent],
  templateUrl: './order-list.component.html',
  standalone: true,
  styleUrl: './order-list.component.css',
})
export class OrderListComponent implements OnInit {
  public orders$!: Observable<Order[]>;

  constructor(
    private ordersService: OrderService,
    private orderApiService: OrderApiService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.orders$ = this.ordersService.orders$;
    if (this.authService.isAdmin) {
      this.orderApiService.getAdminOrders().subscribe((response) => {
        this.ordersService.setOrders(response.orders);
        console.log(response);
      });
    } else {
      this.orderApiService.getOrders().subscribe((response) => {
        this.ordersService.setOrders(response.orders);
        console.log(response);
      });
    }
  }
}
