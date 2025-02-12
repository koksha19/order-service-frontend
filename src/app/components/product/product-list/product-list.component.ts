import {Component, signal} from '@angular/core';
import {Product} from '../product.model';
import {NgForOf} from '@angular/common';
import {ProductComponent} from '../product/product.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [
    NgForOf, ProductComponent
  ],
  templateUrl: './product-list.component.html',
  standalone: true,
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  constructor(private router: Router) {
  }
  products = signal<Product[]>([
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

  public navigateToProduct(id: string): void {
    this.router.navigate(['products', id]);
  }
}
