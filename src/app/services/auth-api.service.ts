import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private apiUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient) {}

  public createCustomer(
    formData: FormData
  ): Observable<{ message: string; customer: Customer }> {
    return this.http.post<{ message: string; customer: Customer }>(
      this.apiUrl + 'signup',
      formData
    );
  }

  public logIn(formData: FormData): Observable<{
    message: string;
    token: string;
    expiresIn: number;
    customerId: string;
    roles: object;
  }> {
    return this.http.post<{
      message: string;
      token: string;
      expiresIn: number;
      customerId: string;
      roles: object;
    }>(this.apiUrl + 'login', formData);
  }
}
