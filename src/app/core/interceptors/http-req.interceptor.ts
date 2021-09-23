import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpReqInterceptor implements HttpInterceptor {
  host = 'http://localhost:3004/';
  toIntercept = ["categories", "goods", "users"];

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const start = this.toIntercept.find((str) => request.url.startsWith(str));
    if (start) {
      const req = request.clone({
        url: `${this.host}${request.url}`
      });
      return next.handle(req);
    }
    return next.handle(request);
  }
}
