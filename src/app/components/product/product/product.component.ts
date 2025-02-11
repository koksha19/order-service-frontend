import {Component, input} from '@angular/core';
import {Product} from '../product.model';

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.component.html',
  standalone: true,
  styleUrl: './product.component.css'
})
export class ProductComponent {
  product = input.required<Product>();
}
