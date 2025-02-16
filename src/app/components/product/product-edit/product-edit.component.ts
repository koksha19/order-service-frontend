import { Component, computed, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Delivery } from '../../../models/delivery.model';
import { MatCheckbox } from '@angular/material/checkbox';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-edit',
  imports: [FormsModule, MatCheckbox, ReactiveFormsModule],
  templateUrl: './product-edit.component.html',
  standalone: true,
  styleUrl: '../../auth/signup/signup.component.css',
})
export class ProductEditComponent {
  public productForm = new FormGroup({
    title: new FormControl(''),
    price: new FormControl(),
    description: new FormControl(''),
    stock: new FormControl(),
    image: new FormControl(''),
  });

  readonly delivery = signal<Delivery>({
    name: 'Select all',
    price: 0,
    checked: false,
    options: [
      { name: 'Standard', price: 50, checked: false },
      { name: 'Express', price: 70, checked: false },
      { name: 'Overnight', price: 100, checked: false },
    ],
  });

  constructor(private productsService: ProductService) {}

  readonly partiallyComplete = computed(() => {
    const delivery = this.delivery();
    if (!delivery.options) {
      return false;
    }
    return (
      delivery.options.some((d) => d.checked) &&
      !delivery.options.every((d) => d.checked)
    );
  });

  public update(checked: boolean, index?: number) {
    this.delivery.update((delivery) => {
      if (index === undefined) {
        delivery.checked = checked;
        delivery.options?.forEach((d) => (d.checked = checked));
      } else {
        delivery.options![index].checked = checked;
        delivery.checked = delivery.options?.every((t) => t.checked) ?? true;
      }
      return { ...delivery };
    });
  }

  public onCreateProduct() {
    const selectedDeliveries =
      this.delivery().options?.filter((d) => d.checked) || [];
    const newProduct: Product = {
      title: this.productForm.value.title as string,
      price: this.productForm.value.price,
      description: this.productForm.value.description as string,
      image: this.productForm.value.image as string,
      stock: this.productForm.value.stock,
      delivery: selectedDeliveries,
    };

    console.log(newProduct);

    this.productsService.createProduct(newProduct);
  }
}
