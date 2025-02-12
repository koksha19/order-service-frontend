import {Component, OnInit} from '@angular/core';
import {Product} from '../product.model';
import {ProductService} from '../../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import {NgIf, NgOptimizedImage} from '@angular/common';
import {ProductListComponent} from '../product-list/product-list.component';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  imports: [
    NgIf,
    NgOptimizedImage,
    FormsModule
  ],
  templateUrl: './product-detail.component.html',
  standalone: true,
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  public product?: Product | null;
  public quantity: number = 1;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  )  {}

  ngOnInit(): void {
    const id: string | null = this.activatedRoute.snapshot.paramMap.get('id');
    this.product = this.productService.findById(id as string);
    if (!this.product) {
      this.router.navigate(['/not-found']); // Redirect if product doesn't exist
    }
  }

  increaseQuantity() {
    if (this.product && this.quantity < this.product.stock) {
      this.quantity++;
    }
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  placeOrder() {
    if (!this.product) return;
    alert(`You have ordered ${this.quantity} x ${this.product.name}!`);
  }
}
