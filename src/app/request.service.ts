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
    const baseHeaders: any = {
      'Content-Type': 'application/json;charset=utf-8',
    };

    if (token) {
      baseHeaders.Authorization =  `Bearer ${token}`;
    }

    const headers = new HttpHeaders(baseHeaders);
    return headers;
  }

  get(url: string, headers = true) {
    return this.http.get<any>(url, {
      headers: headers ? this.generateHeaders() : null
    });
  }

  post(url: string, body= {}) {
    return this.http.post<any>(url, body, {
      headers: this.generateHeaders()
    });
  }
}
