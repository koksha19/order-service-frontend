import { Delivery } from './delivery.model';

export interface Product {
  _id: string;
  title: string;
  price: number;
  delivery: Delivery[];
  description: string;
  image: string;
  stock: number;
}
