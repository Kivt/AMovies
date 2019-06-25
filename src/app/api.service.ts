import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8080/';
  popularPage = 1;

  constructor(private http: HttpClient) { }

  getPopular(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}movies/popular?page=${this.popularPage}`)
      .pipe(
        tap(_ => this.popularPage++)
      );
  }

  getMovieDetails(id: number | string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}movies/${id}`);
  }

  getMovieCast(id: number | string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}movies/${id}/credits`);
  }
}
