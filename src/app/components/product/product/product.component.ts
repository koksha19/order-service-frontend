import { Component, input } from '@angular/core';
import { Product } from '../../../models/product.model';
import { NgClass, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { ApiService } from '../../../services/api.service';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product',
  imports: [NgIf, NgClass, MatButton],
  templateUrl: './product.component.html',
  standalone: true,
  styleUrl: './product.component.css',
})
export class ProductComponent {
  product = input.required<Product>();

  public isAdminRoute = false;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private productsService: ProductService
  ) {
    this.route.url.subscribe((segments) => {
      this.isAdminRoute = segments.some((segment) => segment.path === 'admin');
    });
  }

  public onDelete(productId: string | undefined, event: Event) {
    event.stopPropagation();
    this.productsService.deleteProduct(productId).subscribe({
      next: (response) => {
        console.log(response.message);
      },
      error: (error) => {
        console.error('Error deleting product:', error);
      },
    });
  }
}
