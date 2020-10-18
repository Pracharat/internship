import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    // const setHeaders: any = {
    //   'Content-Type': 'application/json',
    //   'x-transaction-id': this.generateTransactionId(),
    // };
    // req = req.clone({ setHeaders });

    return next.handle(req);
  }

  private generateTransactionId(): string {
    const dateString = formatDate(new Date(), 'yyyyMMddHHmmssSSS', 'en-US');
    const random = `000${Math.floor((Math.random() * 10000) + 1)}`.slice(-4);
    return `${dateString}${random}`;
  }
}
