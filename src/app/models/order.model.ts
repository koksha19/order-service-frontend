import {Customer} from './customer.model';
import {Product} from './product.model';

export interface Order {
  customer: Customer;
  product: Product;
  quantity: number;
  data: Date,
}
