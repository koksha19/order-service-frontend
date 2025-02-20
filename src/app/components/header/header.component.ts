import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgIf, NgOptimizedImage } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [
    MatToolbarModule,
    NgOptimizedImage,
    RouterLink,
    RouterLinkActive,
    MatMenuTrigger,
    MatIcon,
    MatMenu,
    MatMenuItem,
    MatIconButton,
    NgIf,
  ],
  templateUrl: './header.component.html',
  standalone: true,
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private authSubscription = new Subscription();
  private adminSubscription = new Subscription();
  public isAuthenticated = false;
  public isAdmin = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuth;
    this.isAdmin = this.authService.isAdmin;
    this.authSubscription = this.authService
      .getAuthStatusObservable()
      .subscribe((isAuth) => {
        this.isAuthenticated = isAuth;
        this.authService.isAuth = this.isAuthenticated;
      });
    this.adminSubscription = this.authService
      .getIsAdminObservable()
      .subscribe((isAdmin) => {
        this.isAdmin = isAdmin;
        this.authService.isAdmin = this.isAdmin;
      });
  }

  onLogOut() {
    this.isAuthenticated = false;
    this.authService.logOut();
    clearTimeout(this.authService.tokenTimer as number);
    this.router.navigate(['/products']);
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
