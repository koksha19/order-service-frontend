import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public authStatusListener = new Subject<boolean>();

  public getAuthStatusListener() {
    return this.authStatusListener;
  }

  public getAuthStatusObservable() {
    return this.authStatusListener.asObservable();
  }

  public getToken(): string {
    return localStorage.getItem('token') as string;
  }

  public setToken(token: string) {
    localStorage.setItem('token', token);
  }
}
