import { Component, computed, OnInit, signal } from '@angular/core';
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
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Product } from '../../../models/product.model';

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
export class ProductEditComponent implements OnInit {
  public productForm = new FormGroup({
    title: new FormControl('', {
      validators: [Validators.required, Validators.maxLength(50)],
    }),
    price: new FormControl<number | null>(null, {
      validators: [Validators.required, Validators.min(1)],
    }),
    description: new FormControl('', {
      validators: [Validators.required, Validators.minLength(50)],
    }),
    stock: new FormControl<number | null>(null, {
      validators: [Validators.required, Validators.min(1)],
    }),
    image: new FormControl<File | null>(null, Validators.required),
  });

  public imagePreview = '';
  private selectedFile: File | null = null;
  private mode = 'create';
  private productId: string | null = '';
  private product: Product | null = null;

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

  constructor(
    private productsService: ProductService,
    private router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'edit';
        this.productId = paramMap.get('id') as string;
        this.productsService.findById(this.productId).subscribe({
          next: (productData) => {
            const product = productData.product;
            if (!product) {
              return;
            }
            this.product = product;

            this.productForm.patchValue({
              title: product.title,
              price: product.price,
              description: product.description,
              stock: product.stock,
            });

            if (product.delivery) {
              this.delivery().options?.forEach((deliveryOption) => {
                const productOption = product.delivery.find(
                  (d) => d.name === deliveryOption.name
                );
                if (productOption) {
                  deliveryOption.checked = true;
                }
              });
            }
          },
          error: (err) => {
            console.error('Error fetching product:', err);
          },
        });
      } else {
        this.mode = 'create';
        this.productId = null;
      }
    });
  }

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

  public onSaveProduct() {
    if (!this.productForm.valid || !this.selectedFile) {
      return;
    }

    const selectedDeliveries =
      this.delivery().options?.filter((d) => d.checked) || [];

    const formData = new FormData();
    formData.append('title', this.productForm.value.title || '');
    formData.append('price', (this.productForm.value.price || '').toString());
    formData.append('description', this.productForm.value.description || '');
    formData.append('stock', (this.productForm.value.stock || '').toString());
    formData.append('image', this.selectedFile);
    formData.append('delivery', JSON.stringify(selectedDeliveries));

    if (this.mode === 'create') {
      this.productsService.createProduct(formData).subscribe({
        next: async () => {
          await this.router.navigate(['/products']);
        },
        error: (err) => {
          console.error('Error creating product:', err);
        },
      });
    } else {
      this.productsService
        .updateProduct(this.productId as string, formData)
        .subscribe({
          next: async () => {
            await this.router.navigate(['/admin/products']);
          },
          error: (err) => {
            console.error('Error updating product:', err);
          },
        });
    }
  }

  public onImagePicked(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return;
    }
    this.selectedFile = input.files[0];
    this.productForm.patchValue({
      image: this.selectedFile,
    });
    this.productForm.get('image')?.updateValueAndValidity();

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
