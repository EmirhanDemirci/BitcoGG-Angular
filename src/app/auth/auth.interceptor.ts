import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { tap } from "rxjs/operators"
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
// Make a connection with the api (Adding the header key with it)
        if (req.url == 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest') {
            req = req.clone({
                setHeaders: {
                    'X-CMC_PRO_API_KEY': 'e59bd4f0-b6d4-4750-a58c-7c4357a6534f',
                }
            });
        }
// including the bearer token in the header
        if (localStorage.getItem('token') != null) {
            const clonedReq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'))
            });

            return next.handle(clonedReq).pipe(
                tap(
                    succ => { },
                    err => {
                        if (err.status == 401) {
                            localStorage.removeItem('token');
                            this.router.navigateByUrl('/user/login');
                        }
                    }
                )
            )
        }
        else
            return next.handle(req.clone());
    }
}