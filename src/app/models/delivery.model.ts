export interface Delivery {
  name: string;
  checked: boolean;
  price?: number;
  options?: Delivery[];
}
