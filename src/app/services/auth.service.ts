import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public getToken(): string {
    return localStorage.getItem('token') as string;
  }

  public setToken(token: string) {
    localStorage.setItem('token', token);
  }
}
