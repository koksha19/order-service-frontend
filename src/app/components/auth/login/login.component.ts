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
        const now = new Date();
        const expirationDate = new Date(
          now.getTime() + response.expiresIn * 1000
        );
        this.authService.setAuthTimer(response.expiresIn);
        this.authService.setToken(response.token, expirationDate);
        this.authService.getAuthStatusListener().next(true);
        if (Object.keys(response.roles).includes('Admin')) {
          console.log('admin');
          this.authService.getIsAdminListener().next(true);
          localStorage.setItem('isAdmin', 'Admin');
        }
        await this.router.navigate(['/products']);
      },
      error: (err) => {
        console.log('Error logging in:', err);
      },
    });
  }
}
