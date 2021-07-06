import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StateService } from '../services/state.service';


@Injectable()
export class CustomErrorHttpInterceptor implements HttpInterceptor {

    constructor(private stateService: StateService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request).pipe(
            catchError((httpErrorResponse: HttpErrorResponse) => {
                // If token is invalid, force user logout
                if (httpErrorResponse.status == 401) {
                    if (window.location.pathname != '/login') {
                        this.stateService.forceLogout();
                    }
                }
                return throwError(httpErrorResponse);
            })
        );
    }
}