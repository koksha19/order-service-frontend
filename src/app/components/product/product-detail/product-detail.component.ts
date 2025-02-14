import {Component, OnInit} from '@angular/core';
import {Product} from '../../../models/product.model';
import {ProductService} from '../../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  imports: [
    NgIf,
    FormsModule,
    NgForOf
  ],
  templateUrl: './product-detail.component.html',
  standalone: true,
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  public product?: Product | null;
  public quantity = 1;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
  )  {}

  ngOnInit(): void {
    const id: string | null = this.activatedRoute.snapshot.paramMap.get('id');
    this.product = this.productService.findById(id as string);
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
