import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { NgIf } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthApiService } from '../../../services/auth-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [
    MatButton,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    NgIf,
    ReactiveFormsModule,
  ],
  templateUrl: './signup.component.html',
  standalone: true,
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  public customerForm = new FormGroup({
    customer: new FormControl('', {
      validators: [Validators.required, Validators.maxLength(30)],
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    contactName: new FormControl('', { validators: [Validators.required] }),
    address: new FormControl('', { validators: [Validators.required] }),
    phone: new FormControl('', { validators: [Validators.required] }),
    password: new FormControl('', { validators: [Validators.required] }),
    confPassword: new FormControl('', { validators: [Validators.required] }),
  });

  constructor(
    private authApiService: AuthApiService,
    private router: Router
  ) {}

  public onSaveCustomer() {
    if (!this.customerForm.valid) {
      return;
    }

    const formData = new FormData();
    formData.append('customer', this.customerForm.value.customer || '');
    formData.append('email', this.customerForm.value.email || '');
    formData.append('contactName', this.customerForm.value.contactName || '');
    formData.append('address', this.customerForm.value.address || '');
    formData.append('phone', this.customerForm.value.phone || '');
    formData.append('password', this.customerForm.value.password || '');
    formData.append('confPassword', this.customerForm.value.confPassword || '');

    this.authApiService.createCustomer(formData).subscribe({
      next: async () => {
        await this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error creating product:', err);
      },
    });
  }
}
