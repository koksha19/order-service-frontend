import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderApiService {
  private apiUrl = 'http://localhost:8080/orders';

  constructor(private http: HttpClient) {}

  public getOrders(): Observable<{ message: string; orders: Order[] }> {
    return this.http.get<{ message: string; orders: Order[] }>(this.apiUrl);
  }

  public createOrder(): Observable<{ message: string; order: Order }> {
    return this.http.post<{ message: string; order: Order }>(this.apiUrl, {
      message: 'Create order',
    });
  }
}
