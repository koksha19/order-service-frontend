import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Delivery } from '../../../models/delivery.model';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-product-detail',
  imports: [NgIf, FormsModule, NgForOf],
  templateUrl: './product-detail.component.html',
  standalone: true,
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent implements OnInit {
  public product?: Product | null;
  public quantity = 1;
  public selectedDelivery: Delivery | null = null;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id: string | null = this.activatedRoute.snapshot.paramMap.get('id');
    this.productService.findById(id as string).subscribe({
      next: (response) => {
        this.product = response.product;
      },
      error: (err) => {
        console.error('Error fetching product:', err);
      },
    });
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

  addToCart() {
    if (!this.product) return;
    this.cartService
      .addToCart(
        this.product,
        this.selectedDelivery as Delivery,
        this.quantity,
        this.product.price * this.quantity + this.selectedDelivery!.price
      )
      .subscribe({
        next: async () => {
          await this.router.navigate(['/cart']);
        },
        error: (err) => {
          console.error('Failed adding to cart:', err);
        },
      });
  }
}
