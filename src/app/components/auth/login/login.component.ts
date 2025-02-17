import { Component } from '@angular/core';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { AuthApiService } from '../../../services/auth-api.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    MatError,
    ReactiveFormsModule,
    MatLabel,
    MatFormField,
    MatInput,
    NgIf,
    MatButton,
  ],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: '../signup/signup.component.css',
})
export class LoginComponent {
  public loginForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', { validators: [Validators.required] }),
  });

  constructor(
    private authApiService: AuthApiService,
    private router: Router,
    private authService: AuthService
  ) {}

  public onLogin() {
    if (!this.loginForm.valid) {
      return;
    }

    const formData = new FormData();
    formData.append('email', this.loginForm.value.email || '');
    formData.append('password', this.loginForm.value.password || '');

    this.authApiService.logIn(formData).subscribe({
      next: async (response) => {
        console.log(response);
        this.authService.setToken(response.token);
        this.authService.getAuthStatusListener().next(true);
        await this.router.navigate(['/products']);
      },
      error: (err) => {
        console.error('Error creating product:', err);
      },
    });
  }
}
