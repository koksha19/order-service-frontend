import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { NgIf } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-signup',
  imports: [
    MatButton,
    MatCheckbox,
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

  public onSaveCustomer() {
    console.log('');
  }
}
