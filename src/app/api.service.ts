import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://api.themoviedb.org/3/';
  private apiKey = 'f50853c92ba860fc68991df84a4c209b';
  popularPage = 1;

  constructor(private http: HttpClient) { }

  getPopular(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}movie/popular?api_key=${this.apiKey}&language=en-US&page=${this.popularPage}`)
      .pipe(
        tap(_ => this.popularPage++)
      );
  }
}
