import {Component} from '@angular/core';
import {Product} from '../../../models/product.model';
import {AsyncPipe, NgForOf} from '@angular/common';
import {ProductComponent} from '../product/product.component';
import {Router} from '@angular/router';
import { Observable, of } from 'rxjs';
import {ProductService} from '../../../services/product.service';

@Component({
  selector: 'app-product-list',
  imports: [
    NgForOf, ProductComponent, AsyncPipe
  ],
  templateUrl: './product-list.component.html',
  standalone: true,
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  public products$: Observable<Product[]>;

  constructor(private productsService: ProductService, private router: Router) {
    this.products$ = this.productsService.products$
  }

  public navigateToProduct(id: string): void {
    this.router.navigate(['products', id]);
  }
}
