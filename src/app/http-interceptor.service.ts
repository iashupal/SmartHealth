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
        //let csrfTokenValue = authService.xCsrftokenValue;
        let csrfTokenValue = localStorage.getItem('authService.csrftoken');
        let cloneReq;
        console.log('csrf token in interceptor', csrfTokenValue);
        if (csrfTokenValue !== '' && csrfTokenValue !== null && csrfTokenValue !== undefined) {
            cloneReq = req.clone({
                headers: req.headers.append('X-SIGNED', signedValue).append('X-SIGNATURE', signatureValue)
                    .append('X-CSRFToken', csrfTokenValue),
                withCredentials: true
            });
        } else {
            console.log("inside http interceptor else")
            if (!req.url.includes('login')) {
                console.log("inside http interceptor else if")
                cloneReq = req.clone({
                    headers: req.headers.append('X-SIGNED', signedValue).append('X-SIGNATURE', signatureValue)
                        .append('X-CSRFToken', 'n5P7XhFXIf3W1VrEpcdlIvYKpNSp9VuhOYJ4C25ZeynS4ZnOG8w1kUw24SxJ63FP'),
                    withCredentials: true
                });
                console.log("header is ", cloneReq)
            } else {
                console.log("inside http interceptor else else")
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
                        localStorage.setItem('authService.csrftoken', authService.xCsrftokenValue);
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
