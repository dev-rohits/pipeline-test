import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Injectable()
export class SingleLoginInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // request = request.clone({
    //   headers: new HttpHeaders()
    //     .append('Cross-Origin-Embedder-Policy', ['require-corp', 'always'])
    //     .append('Cross-Origin-Opener-Policy', ['same-origin', 'always']),
    // });
    if (this.authService.getSingleLoginValidateToken) {
      request = request.clone({
        headers: request.headers.set('loginToken', this.authService.getSingleLoginValidateToken)
          .set('Cross-Origin-Embedder-Policy', ['require-corp', 'always'])
          .set('Cross-Origin-Opener-Policy', ['same-origin', 'always'])
      })
    }
    return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        this.router.navigateByUrl("/auth/login")
        localStorage.clear();
      }
      throw error
    }))
  }
}
