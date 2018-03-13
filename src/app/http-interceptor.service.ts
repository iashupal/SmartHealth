import { Router } from '@angular/router';
import { Injectable, Injector } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { CookieService } from 'ngx-cookie';
import Cookies from 'js-cookie';
import { AuthService } from './services/auth.service';

@Injectable()
export class NoopHttpInterceptor implements HttpInterceptor {

    constructor(private router: Router, private cookieService: CookieService, private injector: Injector) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authService = this.injector.get(AuthService);
        const signedValue = authService.xSignedValue;
        const signatureValue = authService.xSignatureValue;
        let csrfTokenValue = authService.xCsrftokenValue;
        let cloneReq;
        console.log('csrf token in interceptor', csrfTokenValue);
        if (csrfTokenValue !== '' && csrfTokenValue !== null && csrfTokenValue !== undefined) {
            cloneReq = req.clone({
                headers: req.headers.append('X-SIGNED', signedValue).append('X-SIGNATURE', signatureValue)
                    .append('X-CSRFToken', csrfTokenValue),
                withCredentials: true
            });
        } else {
            if (!req.url.includes('login')) {
                cloneReq = req.clone({
                    headers: req.headers.append('X-SIGNED', signedValue).append('X-SIGNATURE', signatureValue)
                        .append('X-CSRFToken', '44vppq1h2PErw7skI2jcYm3IrOYhySAKMOnaVr4lBXX21HAJN0ZWO9u3D4j3ZCBi'),
                    withCredentials: true
                });
            } else {
                cloneReq = req.clone({
                    headers: req.headers.append('X-SIGNED', signedValue).append('X-SIGNATURE', signatureValue),
                    withCredentials: true
                });
            }
        }
        console.log('Interceptor Clone req ', cloneReq);
        return next.handle(cloneReq).do(
            event => {
                console.log('Response Event in Interceptor', event);
                console.log('csrf cookie in inerceptor', this.cookieService.get('csrftoken'));
                if (this.cookieService.get('csrftoken') !== '' && this.cookieService.get('csrftoken') !== null
                    && this.cookieService.get('csrftoken') !== undefined) {
                        csrfTokenValue = this.cookieService.get('csrftoken');
                        authService.xCsrftokenValue = csrfTokenValue;
                        console.log('authService.xCsrftokenValue', authService.xCsrftokenValue);
                }
            }
        );
        /*
        return next.handle(req)
        .do(
            (next) => {
            console.log('next is ', next);
            },
            (error) => {
                console.log('error is', error);
                if (error.status === 401 || error.status === 403) {
                    console.log('navigate user to the login page');
                    // this.router.navigate(['login'])
                    // return Observable.empty();
                    } else if (error.status === 404) {
                    console.log('navigate user to the resource not found page');
                    // this.router.navigate(['resource-not-found'])
                    // return Observable.empty()
                }
            }
        );
        */
    }
}
