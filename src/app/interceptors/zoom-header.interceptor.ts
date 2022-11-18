import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ZoomHeaderInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    request = request.clone({
      headers: new HttpHeaders()
        .append('Cross-Origin-Embedder-Policy', ['require-corp', 'always'])
        .append('Cross-Origin-Opener-Policy', ['same-origin', 'always']),
    });
    return next.handle(request);
  }
}
