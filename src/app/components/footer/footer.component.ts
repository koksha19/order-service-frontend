import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [MatToolbarModule, NgOptimizedImage],
  templateUrl: './footer.component.html',
  standalone: true,
  styleUrl: './footer.component.css'
})
export class FooterComponent {

}
