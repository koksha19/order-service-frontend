import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly _products$: BehaviorSubject<Product[]> = new BehaviorSubject<
    Product[]
  >([
    /*{
      id: 'asdfsadf',
      name: 'First',
      price: 100,
      description: "First description",
      image: 'https://sc1.musik-produktiv.com/pic-010153533xl/suhr-custom-modern-3ts.jpg',
      stock: 5,
      deliveries: [
        {name: 'Standard', price: 50, checked: false},
        {name: 'Express', price: 70, checked: false},
        {name: 'Overnight', price: 100, checked: false},
      ]
    },*/
  ]);
  public readonly products$ = this._products$.asObservable();

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
}
