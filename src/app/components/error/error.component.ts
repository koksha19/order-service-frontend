import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-error',
  imports: [
    MatDialogTitle,
    MatButton,
    MatDialogClose,
    MatDialogContent,
    MatDialogActions,
  ],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css',
  standalone: true,
})
export class ErrorComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) {}
}
