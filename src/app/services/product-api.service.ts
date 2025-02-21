import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductApiService {
  private apiUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient) {}

  public getProducts(
    productsPerPage: number,
    currentPage: number
  ): Observable<{
    message: string;
    products: Product[];
    productCount: number;
  }> {
    const paginationQuery = `?pagesize=${productsPerPage}&page=${currentPage}`;
    return this.http.get<{
      message: string;
      products: Product[];
      productCount: number;
    }>(this.apiUrl + 'products' + paginationQuery);
  }

  public getProduct(
    productId: string
  ): Observable<{ message: string; product: Product }> {
    return this.http.get<{ message: string; product: Product }>(
      this.apiUrl + `products/${productId}`
    );
  }

  public createProduct(
    formData: FormData
  ): Observable<{ message: string; product: Product }> {
    return this.http.post<{ message: string; product: Product }>(
      this.apiUrl + 'admin/products',
      formData
    );
  }

  public updateProduct(
    productId: string,
    formData: FormData
  ): Observable<{ message: string; product: Product }> {
    return this.http.put<{ message: string; product: Product }>(
      this.apiUrl + `admin/products/${productId}`,
      formData
    );
  }

  public deleteProduct(
    productId: string | undefined
  ): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(
      this.apiUrl + `admin/products/${productId}`
    );
  }
}
