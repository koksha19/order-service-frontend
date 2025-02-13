import {Customer} from './customer.model';
import {Product} from './product.model';
import {Delivery} from './delivery.model';

export interface Order {
  customer: Customer;
  product: Product;
  quantity: number;
  delivery: Delivery;
  date: Date,
}
