import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { LocalStorageServiceEncrypt } from 'angular-2-local-storage-encrypt';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GLOBALS } from '../utils/globals';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  corsHeaders: any;
  token: any;
  constructor(
    private _localStorageService: LocalStorageServiceEncrypt,
    @Inject(LOCAL_STORAGE) public storage: StorageService
  ) {
    this.corsHeaders = HttpHeaders;
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.token = this._localStorageService.get(GLOBALS.ACCESS_TOKEN);

    this.corsHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });

    var newreq;

    if (this.token) {
      newreq = request.clone({
        headers: this.corsHeaders.append('x-access-token', this.token),
      });
    } else {
      newreq = request.clone({
        headers: this.corsHeaders,
      });
    }
    return next.handle(newreq).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }
}
