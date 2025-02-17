import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:8080/products';

  constructor(private http: HttpClient) {}

  public getProducts(): Observable<{ message: string; products: Product[] }> {
    return this.http.get<{ message: string; products: Product[] }>(this.apiUrl);
  }

  public getProduct(
    productId: string
  ): Observable<{ message: string; product: Product }> {
    return this.http.get<{ message: string; product: Product }>(
      this.apiUrl + `/${productId}`
    );
  }

  public createProduct(
    formData: FormData
  ): Observable<{ message: string; product: Product }> {
    return this.http.post<{ message: string; product: Product }>(
      this.apiUrl,
      formData
    );
  }

  public updateProduct(
    productId: string,
    formData: FormData
  ): Observable<{ message: string; product: Product }> {
    return this.http.put<{ message: string; product: Product }>(
      this.apiUrl + `/${productId}`,
      formData
    );
  }

  public deleteProduct(
    productId: string | undefined
  ): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(this.apiUrl + `/${productId}`);
  }
}
