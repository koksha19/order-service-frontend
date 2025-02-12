import { Component } from '@angular/core';
import {HeaderComponent} from '../../header/header.component';
import {FooterComponent} from '../../footer/footer.component';
import {NgForOf} from '@angular/common';
import {ProductComponent} from '../../product/product/product.component';

@Component({
  selector: 'app-order-list',
  imports: [HeaderComponent, FooterComponent, NgForOf, ProductComponent],
  templateUrl: './order-list.component.html',
  standalone: true,
  styleUrl: './order-list.component.css'
})
export class OrderListComponent {

}
