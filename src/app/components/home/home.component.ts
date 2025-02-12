import { Component } from '@angular/core';
import {HeaderComponent} from '../header/header.component';
import {FooterComponent} from '../footer/footer.component';
import {ProductListComponent} from '../product/product-list/product-list.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, ProductListComponent, FooterComponent, RouterOutlet],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
