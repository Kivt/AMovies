import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  generateHeaders() {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${token}`
    });
    return headers;
  }

  get(url: string) {
    return this.http.get<any>(url, {
      headers: this.generateHeaders()
    });
  }

  post(url: string, body= {}) {
    return this.http.post<any>(url, body, {
      headers: this.generateHeaders()
    });
  }
}
