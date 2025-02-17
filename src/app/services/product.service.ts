import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Product } from '../models/product.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly _products$: BehaviorSubject<Product[]> = new BehaviorSubject<
    Product[]
  >([]);
  public readonly products$ = this._products$.asObservable();

  constructor(private apiService: ApiService) {}

  get products(): Product[] {
    return this._products$.getValue();
  }

  private set products(products: Product[]) {
    this._products$.next(products);
  }

  public setProducts(products: Product[]): void {
    this.products = products;
  }

  public findById(id: string): Product | null {
    return this.products.find((product) => product._id === id) || null;
  }

  public createProduct(formData: FormData): Observable<{ product: Product }> {
    return this.apiService.createProduct(formData).pipe(
      tap((response) => {
        this.products = [...this.products, response.product];
      })
    );
  }

  public deleteProduct(
    productId: string | undefined
  ): Observable<{ message: string }> {
    return this.apiService.deleteProduct(productId).pipe(
      tap(() => {
        this.products = this.products.filter(
          (product) => product._id !== productId
        );
      })
    );
  }
}
