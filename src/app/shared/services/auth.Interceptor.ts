import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse,
    HttpProgressEvent, HttpResponse, HttpUserEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshingToken: boolean;
  private tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private authService: AuthService) {
  }

  addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }

  addUserGuid(req: HttpRequest<any>, userGuid: string): HttpRequest<any> {
    return req.clone({ setHeaders: { 'Legacy-Token': `${userGuid}` } });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    const token = this.authService.getAccessToken();
    if (token && req.url.indexOf('Token') < 0) {
      return next.handle(this.addToken(req, this.authService.getAccessToken()))
        .catch((error) => {
          if (error instanceof HttpErrorResponse) {
            switch ((<HttpErrorResponse>error).status) {
              case 400:
                return Observable.throw(error);
              case 401:
                return this.refreshToken(req, next);
            }
          } else {
            return Observable.throw(error);
          }
        })
        .finally(() => {
          if (window['cdr']) {
            setTimeout(() => {
              window['cdr'].detectChanges();
            }, 250);
          }
        });
    } else {
      const userGuid = this.authService.getUserGuid();
      if (userGuid && !token && req.url.indexOf('Token') < 0) {
        return next.handle(this.addUserGuid(req, this.authService.getUserGuid()))
        .catch((error) => {
          if (error instanceof HttpErrorResponse) {
            switch ((<HttpErrorResponse>error).status) {
              case 401:
                // ServiceContainer.stateServiceInstance.showWidgets = false;
                this.authService.removeUserGuid();
                break;
            }
          } else {
            return Observable.throw(error);
          }
        });
      }
    }
    return next.handle(req);
  }

  refreshToken(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;
      // Reset here so that the following requests wait until the token
      // comes back from the refreshToken call.
      this.tokenSubject.next(null);
      return this.authService.refreshToken()
        .switchMap((newValue: { access_token, expires_in, resource, token_type }) => {
          if (newValue.access_token) {
            this.authService.setAccessToken(newValue);
            this.tokenSubject.next(newValue.access_token);
            return next.handle(this.addToken(req, newValue.access_token));
          } else {
            this.authService.logout();
            return Observable.throw('could not refresh');
          }
        })
        .catch(error => {
          this.authService.logout();
          return Observable.throw(error);
        })
        .finally(() => {
          this.isRefreshingToken = false;
        });
    } else {
      return this.tokenSubject
        .filter(token => token != null)
        .take(1)
        .switchMap(token => {
          return next.handle(this.addToken(req, token));
        });
    }
  }
}
