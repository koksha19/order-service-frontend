import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product.model';
import { AsyncPipe, NgForOf } from '@angular/common';
import { ProductComponent } from '../product/product.component';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from '../../../services/product.service';
import { ProductApiService } from '../../../services/product-api.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-product-list',
  imports: [NgForOf, ProductComponent, AsyncPipe, MatPaginator],
  templateUrl: './product-list.component.html',
  standalone: true,
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  public products$: Observable<Product[]>;
  public totalProducts = 10;
  public productsPerPage = 2;
  public pageSizeOptions = [1, 2, 5, 10, 20];
  constructor(
    private productsService: ProductService,
    private router: Router,
    private apiService: ProductApiService
  ) {
    this.products$ = this.productsService.products$;
  }

  public ngOnInit() {
    this.apiService.getProducts().subscribe((products) => {
      this.productsService.setProducts(products.products);
      console.log(products);
    });
  }

  public navigateToProduct(id: string | undefined): void {
    this.router.navigate(['products', id]);
  }
}
