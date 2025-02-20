import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public authStatusListener = new Subject<boolean>();
  public isAdminListener = new Subject<boolean>();
  public isAuth = false;
  public isAdmin = false;
  public tokenTimer: unknown;

  constructor(private router: Router) {}

  public getAuthStatusListener() {
    return this.authStatusListener;
  }

  public getAuthStatusObservable() {
    return this.authStatusListener.asObservable();
  }

  public getIsAdminListener() {
    return this.isAdminListener;
  }

  public getIsAdminObservable() {
    return this.isAdminListener.asObservable();
  }

  public getToken(): string {
    return localStorage.getItem('token') as string;
  }

  public setToken(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expirationDate', expirationDate.toISOString());
  }

  public logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('isAdmin');
    this.authStatusListener.next(false);
    this.isAdminListener.next(false);
  }

  public autoAuth() {
    const authInfo = this.getAuthData();
    if (!authInfo) return;
    const now = new Date();
    const expiresIn = authInfo!.expirationDate.getTime() - now.getTime();
    console.log(authInfo, expiresIn / 1000);
    if (expiresIn > 0) {
      this.setToken(authInfo!.token, authInfo!.expirationDate);
      this.isAuth = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
      if (authInfo.isAdmin) {
        this.isAdmin = true;
        this.isAdminListener.next(true);
      }
    }
  }

  public setAuthTimer(expiresIn: number) {
    this.tokenTimer = setTimeout(async () => {
      this.logOut();
      this.isAuth = false;
      await this.router.navigate(['/products']);
    }, expiresIn * 1000);
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expirationDate');
    const isAdmin = localStorage.getItem('isAdmin');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      isAdmin: isAdmin,
    };
  }
}
