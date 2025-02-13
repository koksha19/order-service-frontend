import {Component, input} from '@angular/core';
import { Order } from '../../../models/order.model';

@Component({
  selector: 'app-order',
  imports: [],
  templateUrl: './order.component.html',
  standalone: true,
  styleUrl: './order.component.css'
})
export class OrderComponent {
  order = input.required<Order>();
}
