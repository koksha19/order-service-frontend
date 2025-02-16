import { Component, computed, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Delivery } from '../../../models/delivery.model';
import { ProductService } from '../../../services/product.service';
import { NgIf } from '@angular/common';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatError } from '@angular/material/form-field';
import { MatCheckbox } from '@angular/material/checkbox';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    MatFormField,
    MatInput,
    MatButton,
    MatLabel,
    MatError,
    MatCheckbox,
  ],
  templateUrl: './product-edit.component.html',
  standalone: true,
  styleUrl: '../../auth/signup/signup.component.css',
})
export class ProductEditComponent {
  public productForm = new FormGroup({
    title: new FormControl('', {
      validators: [Validators.required, Validators.maxLength(50)],
    }),
    price: new FormControl(null, {
      validators: [Validators.required, Validators.min(1)],
    }),
    description: new FormControl('', {
      validators: [Validators.required, Validators.minLength(50)],
    }),
    stock: new FormControl(null, {
      validators: [Validators.required, Validators.min(1)],
    }),
    image: new FormControl(null),
  });

  public imagePreview = '';
  private selectedFile: File | null = null;

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

  constructor(
    private productsService: ProductService,
    private router: Router
  ) {}

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
    if (!this.productForm.valid || !this.selectedFile) {
      return;
    }

    console.log(this.selectedFile);

    const selectedDeliveries =
      this.delivery().options?.filter((d) => d.checked) || [];

    const formData = new FormData();
    formData.append('title', this.productForm.value.title || '');
    formData.append('price', this.productForm.value.price || '');
    formData.append('description', this.productForm.value.description || '');
    formData.append('stock', this.productForm.value.stock || '');
    formData.append('image', this.selectedFile);
    formData.append('delivery', JSON.stringify(selectedDeliveries));
    console.log(formData);

    this.productsService.createProduct(formData).subscribe({
      next: (response) => {
        console.log('Product added:', response.product);
        this.productForm.reset();
        this.imagePreview = '';
        this.selectedFile = null;
        this.router.navigate(['/products']);
      },
      error: (err) => {
        console.error('Error creating product:', err);
      },
    });
  }

  public onImagePicked(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return;
    }
    this.selectedFile = input.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        this.imagePreview = reader.result;
      }
    };
    reader.readAsDataURL(this.selectedFile);

    console.log(this.selectedFile);
    console.log(this.productForm);
  }
}
