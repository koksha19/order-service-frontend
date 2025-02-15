import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public getProducts(): Observable<{ message: string; products: Product[] }> {
    return this.http.get<{ message: string; products: Product[] }>(
      'http://localhost:8080/products'
    );
  }
}
