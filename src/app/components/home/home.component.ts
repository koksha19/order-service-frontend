import { Component } from '@angular/core';
import {ProductListComponent} from '../product/product-list/product-list.component';

@Component({
  selector: 'app-home',
  imports: [ProductListComponent],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
