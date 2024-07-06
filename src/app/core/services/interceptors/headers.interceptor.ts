import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {


    if(localStorage.getItem('u.token') !== null){

      const myToken:any ={
        token:localStorage.getItem('u.token')
      }
      request = request.clone({
        setHeaders:myToken
      })
    }
    return next.handle(request);
  }
}
