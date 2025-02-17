import { Component, input } from '@angular/core';
import { Product } from '../../../models/product.model';
import { NgClass, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatButton } from '@angular/material/button';

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

  constructor(private route: ActivatedRoute) {
    this.route.url.subscribe((segments) => {
      this.isAdminRoute = segments.some((segment) => segment.path === 'admin');
    });
  }
}
