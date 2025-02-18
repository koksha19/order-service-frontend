import { Product } from './product.model';
import { Delivery } from './delivery.model';

export interface CartItem {
  product: Product;
  quantity: number;
  delivery: Delivery;
}
