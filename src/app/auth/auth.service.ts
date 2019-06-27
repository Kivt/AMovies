import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/';

  token = '';
  loggedIn$ = new Subject<any>();

  constructor(
    private http: HttpClient,
  ) { }

  login(email: string, password: string) {
    return this.http.post(this.baseUrl + 'login', { email, password })
      .pipe(
        catchError(err => throwError(err.error.message))
      );
  }

  isAuth(): boolean {
    return !!this.token;
  }

  getToken(): string {
    this.token = window.localStorage.getItem('token') || '';
    return this.token;
  }

  setToken(token: string) {
    this.token = token;
    window.localStorage.setItem('token', token);
    this.loggedIn$.next(token);
  }
}
