import { Customer } from './customer.model';
import { Product } from './product.model';
import { Delivery } from './delivery.model';

export interface Order {
  _id?: string;
  customer: Customer;
  products: {
    product: Product;
    quantity: number;
    delivery: Delivery;
  }[];
  date: string;
}
