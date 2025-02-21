import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorComponent } from '../components/error/error.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private dialog: MatDialog) {}

  intercept(req: HttpRequest<unknown>, handler: HttpHandler) {
    return handler.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Error occurred';
        if (error.error.message) {
          errorMessage = error.error.message;
        }
        console.log(errorMessage);
        this.dialog.open(ErrorComponent, { data: errorMessage });
        return throwError(() => error);
      })
    );
  }
}
