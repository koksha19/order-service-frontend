import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<unknown>, handler: HttpHandler) {
    return handler.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        return throwError(() => error);
      })
    );
  }
}
