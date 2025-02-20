import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { Order } from '../models/order.model';
import { OrderApiService } from './order-api.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly _orders$: BehaviorSubject<Order[]> = new BehaviorSubject<
    Order[]
  >([]);
  public readonly orders$ = this._orders$.asObservable();

  constructor(private orderApiService: OrderApiService) {}

  get orders(): Order[] {
    return this._orders$.getValue();
  }

  private set orders(orderList: Order[]) {
    this._orders$.next(orderList);
  }

  public setOrders(orders: Order[]): void {
    this.orders = orders;
  }

  public createOrder() {
    return this.orderApiService.createOrder().pipe(
      tap((response) => {
        console.log(response);
        this.orders = [...this.orders, response.order];
      })
    );
  }
}
