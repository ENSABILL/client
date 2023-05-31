import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { AlertService } from '../shared/services/alert.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private alertService: AlertService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err) => {
        let error = err;
        if (error instanceof HttpErrorResponse) {
          error = error?.error;
          if (400 <= err.status && err.status <= 500) {
            this.alertService.error(error);
            this.authService.logout();
          }
        }

        return throwError(() => error);
      })
    );
  }
}
