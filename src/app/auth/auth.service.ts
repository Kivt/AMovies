import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token = '';

  constructor() { }

  isAuth(): boolean {
    return !!this.token;
  }

  getToken(): string {
    this.token = window.localStorage.getItem('token') || '';
    return this.token;
  }
}
