import { Component } from '@angular/core';
import {HeaderComponent} from '../../header/header.component';
import {FooterComponent} from '../../footer/footer.component';
import {AsyncPipe, NgForOf} from '@angular/common';
import {ProductComponent} from '../../product/product/product.component';
import {Observable} from 'rxjs';
import { Order } from '../../../models/order.model';
import {OrderService} from '../../../services/order.service';
import {OrderComponent} from '../order/order.component';

@Component({
  selector: 'app-order-list',
  imports: [HeaderComponent, FooterComponent, NgForOf, ProductComponent, AsyncPipe, OrderComponent],
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
