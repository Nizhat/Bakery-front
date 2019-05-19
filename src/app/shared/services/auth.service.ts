import { environment } from '../../../environments/environment';
import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { delay, tap } from 'rxjs/operators';

@Injectable()
export class AuthService extends BaseService {

  public tokenUrl = environment.apiUrlConstructor + 'Token';
  public changePassUrl = environment.apiUrlConstructor + 'api/Account/ChangePassword';
  public isLoggedIn: boolean = false;  
  // store the URL so we can redirect after logging in
  redirectUrl: string;

  private httpHeaders = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded'
  });
  options = { headers: this.httpHeaders };

  constructor(http: HttpClient, private router: Router) {
    super(http);
  }

  setAccessToken(res: any) {
    localStorage.setItem('access_token', res.access_token);
    localStorage.setItem('userName', res.userName);
    localStorage.setItem('userId', res.userId);
    localStorage.setItem('firstName', res.firstName);
    localStorage.setItem('lastName', res.lastName);
  }

  getAccessToken() {
    return localStorage.getItem('access_token');
  }

  getUserName(): string {
    return localStorage.getItem('userName');
  }

  getUser(): any {
    return { firstName: localStorage.getItem('firstName'), lastName: localStorage.getItem('lastName') };
  }

  getUserId(): string {
    return localStorage.getItem('userId');
  }

  getUserGuid() {
    return localStorage.getItem('userGuid');
  }

  removeUserGuid() {
    localStorage.removeItem('userGuid');
  }

  getRefreshToken(): string {
    return localStorage.getItem('refresh_token');
  }

  setRefreshToken(refreshToken: string): void {
    localStorage.setItem('refresh_token', refreshToken);
  }
  setUserRoles(roles: string) {
    localStorage.setItem('roles', roles);
  }

  login(username: string, password: string): Observable<any>  {
    const body = new HttpParams()
    .set('grant_type', 'password')
    .set('username', username)
    .set('password', password);

    return this.http.post<any>(this.tokenUrl, body.toString(), this.options).pipe(
      delay(1000),
      tap(val => this.isLoggedIn = true)
    );
  }

  refreshToken(): Observable<any> {
    const updateBody = new HttpParams()
    .set('grant_type', 'refresh_token')
    .set('refresh_token', this.getRefreshToken())
    .set('username', this.getUserName());
    return this.http.post<{access_token, expires_in, resource, token_type }>(this.tokenUrl, updateBody.toString(), this.options);
  }

  changePassword(oldPassword: string, newPassword: string, newPassword2: string): Observable<any>  {
    const body = new HttpParams()
    .set('OldPassword', oldPassword)
    .set('NewPassword', newPassword)
    .set('ConfirmPassword', newPassword2);

    return this.http.post<any>(this.changePassUrl, body.toString(), this.options);
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('roles');
    this.isLoggedIn = false;
    this.router.navigate(['']);
  }

}
