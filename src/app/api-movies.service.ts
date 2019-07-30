import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class ApiMoviesService {
  private baseUrl = 'http://localhost:8080/';
  popularPage = 1;

  constructor(private request: RequestService) { }

  getPopular(): Observable<any> {
    return this.request.get(`${this.baseUrl}movies/popular?page=${this.popularPage}`)
      .pipe(
        tap(_ => this.popularPage++)
      );
  }

  getMovieDetails(id: number | string): Observable<any> {
    return this.request.get(`${this.baseUrl}movies/${id}`);
  }

  getMovieCast(id: number | string): Observable<any> {
    return this.request.get(`${this.baseUrl}movies/${id}/credits`);
  }

  getMovieSimilar(id: number | string): Observable<any> {
    return this.request.get(`${this.baseUrl}movies/${id}/similar`);
  }
}
