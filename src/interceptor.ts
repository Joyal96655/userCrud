import { Injectable } from '@angular/core';
// tslint:disable-next-line:quotemark
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from "@angular/common/http";
import { Observable } from 'rxjs';

import { environment } from './environments/environment';
export class Interceptor implements HttpInterceptor {
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
      ): Observable<HttpEvent<any>> {
        const loadingContainer: HTMLElement = document
          .getElementsByClassName('popup')
          .item(0) as HTMLElement;

        /* sanket start */
        const loadingContainerForCustomError: HTMLElement = document
          .getElementsByClassName('customPopup')
          .item(0) as HTMLElement;
        const myErrorMsg: HTMLElement = document
          .getElementsByClassName('myErrorMsg')
          .item(0) as HTMLElement;

        const url = environment.apiUrl;
        console.log('url', url, 'req', req.url);
        if (req.url === '/user/signin' || req.url === '/user/signup'){
          console.log('req.url in else if', req.url);
          req = req.clone({
            url: url + req.url,
            setHeaders: {
              'Content-Type': 'application/json',
             },
          });
        } else if (req.url === '/user/me') {
          console.log('req.url in if', req.url);
          req = req.clone({
            url: url + req.url,
            setHeaders: {
              'Content-Type': 'application/json',
                'x-cs-token': localStorage.getItem('token')
              // Accept: 'application/json',
              // AuthToken: 'ePnnWv6zrcldla62vUP5XhFw3W89kI3N',
            },
          });
        }else {
          console.log('req.url in if', req.url);
          req = req.clone({
            url: url + req.url,
            setHeaders: {
              'Content-Type': 'application/json',
                'x-cs-token': localStorage.getItem('token')
              // Accept: 'application/json',
              // AuthToken: 'ePnnWv6zrcldla62vUP5XhFw3W89kI3N',
            },
          });
        }
        console.log('req', req);
        return next.handle(req);
      }
  }
