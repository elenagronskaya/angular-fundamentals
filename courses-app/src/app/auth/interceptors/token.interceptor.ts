import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse, HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { SessionStorageService } from '../services/session-storage.service';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  token: string | null = '';

  constructor(
    private sessionStorage: SessionStorageService,
    private authService: AuthService,
    private router: Router
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.token = this.sessionStorage.getToken();

    request = this.addAuthenticationToken(request);

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error && error.status === 401) {
          this.authService.logout();
          this.router.parseUrl('/login');

        }
        return of(new HttpResponse({ body: {}, status: 0 }));
      })

    );
  }

  private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
    if (!this.token) {
      return request;
    }

    return request.clone({
      setHeaders: {
        Authorization: this.token,
      },
    });
  }
}
