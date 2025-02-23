import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderApiService {
  private apiUrl = environment.domain;
  private endpoints = {
    orders: 'orders/',
    adminOrders: 'admin/orders/',
  };

  constructor(private http: HttpClient) {}

  public getOrders(): Observable<{ message: string; orders: Order[] }> {
    return this.http.get<{ message: string; orders: Order[] }>(
      this.apiUrl + this.endpoints.orders
    );
  }

  public createOrder(): Observable<{ message: string; order: Order }> {
    return this.http.post<{ message: string; order: Order }>(
      this.apiUrl + this.endpoints.orders,
      {
        message: 'Create order',
      }
    );
  }

  public getAdminOrders(): Observable<{ message: string; orders: Order[] }> {
    return this.http.get<{ message: string; orders: Order[] }>(
      this.apiUrl + this.endpoints.adminOrders
    );
  }

  public getInvoice(orderId: string): Observable<Blob> {
    return this.http.get(this.apiUrl + this.endpoints.orders + orderId, {
      responseType: 'blob',
    });
  }
}
