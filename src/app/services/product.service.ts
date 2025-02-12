import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../components/product/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly _products$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([
    {
      id: 'asdfsadf',
      name: 'First',
      price: 100,
      description: "First description",
      image: 'https://sc1.musik-produktiv.com/pic-010153533xl/suhr-custom-modern-3ts.jpg',
      stock: 5,
    },
    {
      id: 'asdfasdfa',
      name: 'Second',
      price: 1200,
      description: "Second description",
      image: 'https://images.squarespace-cdn.com/content/v1/602065399c6bdd6741ed57e1/1711214292662-I612PUZ3L17MXIE4B23A/StandardGalleryCaramel.jpg',
      stock: 5,
    },
    {
      id: 'asdffsaf',
      name: 'Second',
      price: 1200,
      description: "Second description",
      image: 'https://images.squarespace-cdn.com/content/v1/602065399c6bdd6741ed57e1/1711214292662-I612PUZ3L17MXIE4B23A/StandardGalleryCaramel.jpg',
      stock: 5,
    },
    {
      id: 'gfgfgfdf',
      name: 'Second',
      price: 1200,
      description: "Second description",
      image: 'https://images.squarespace-cdn.com/content/v1/602065399c6bdd6741ed57e1/1711214292662-I612PUZ3L17MXIE4B23A/StandardGalleryCaramel.jpg',
      stock: 5,
    },
    {
      id: 'gfgfgfdf',
      name: 'Second',
      price: 1200,
      description: "Second description",
      image: 'https://images.squarespace-cdn.com/content/v1/602065399c6bdd6741ed57e1/1711214292662-I612PUZ3L17MXIE4B23A/StandardGalleryCaramel.jpg',
      stock: 5,
    },
    {
      id: 'gfgfgfdf',
      name: 'Second',
      price: 1200,
      description: "Second description",
      image: 'https://images.squarespace-cdn.com/content/v1/602065399c6bdd6741ed57e1/1711214292662-I612PUZ3L17MXIE4B23A/StandardGalleryCaramel.jpg',
      stock: 5,
    },
    {
      id: 'gfgfgfdf',
      name: 'Second',
      price: 1200,
      description: "Second description",
      image: 'https://images.squarespace-cdn.com/content/v1/602065399c6bdd6741ed57e1/1711214292662-I612PUZ3L17MXIE4B23A/StandardGalleryCaramel.jpg',
      stock: 5,
    },
    {
      id: 'gfgfgfdf',
      name: 'Second',
      price: 1200,
      description: "Second description",
      image: 'https://images.squarespace-cdn.com/content/v1/602065399c6bdd6741ed57e1/1711214292662-I612PUZ3L17MXIE4B23A/StandardGalleryCaramel.jpg',
      stock: 5,
    },
    {
      id: 'gfgfgfdf',
      name: 'Second',
      price: 1200,
      description: "Second description",
      image: 'https://images.squarespace-cdn.com/content/v1/602065399c6bdd6741ed57e1/1711214292662-I612PUZ3L17MXIE4B23A/StandardGalleryCaramel.jpg',
      stock: 5,
    },
    {
      id: 'gfgfgfdf',
      name: 'Second',
      price: 1200,
      description: "Second description",
      image: 'https://images.squarespace-cdn.com/content/v1/602065399c6bdd6741ed57e1/1711214292662-I612PUZ3L17MXIE4B23A/StandardGalleryCaramel.jpg',
      stock: 5,
    },
    {
      id: 'gfgfgfdf',
      name: 'Second',
      price: 1200,
      description: "Second description",
      image: 'https://images.squarespace-cdn.com/content/v1/602065399c6bdd6741ed57e1/1711214292662-I612PUZ3L17MXIE4B23A/StandardGalleryCaramel.jpg',
      stock: 5,
    },
    {
      id: 'gfgfgfdf',
      name: 'Second',
      price: 1200,
      description: "Second description",
      image: 'https://images.squarespace-cdn.com/content/v1/602065399c6bdd6741ed57e1/1711214292662-I612PUZ3L17MXIE4B23A/StandardGalleryCaramel.jpg',
      stock: 5,
    },
  ]);
  public readonly products$ = this._products$.asObservable();

  get products(): Product[] {
    return this._products$.getValue();
  }

  private set products(tasks: Product[]){
    this._products$.next(tasks);
  }

  public setProducts(tasks: Product[]): void{
    this.products = tasks;
  }

  public addTask(task: Product): void {
    this.products = [...this.products, task];
  }

  public findById(id: string): Product | null {
    return this.products.find((product) => product.id === id) || null;
  }
}
