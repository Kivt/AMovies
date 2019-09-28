import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class ApiMoviesService {
  private API_KEY = 'api_key=f50853c92ba860fc68991df84a4c209b';
  private baseUrl = 'https://api.themoviedb.org/3/';
  popularPage = 1;
  topRatedPAge = 1;

  constructor(private request: RequestService) { }

  getPopular(): Observable<any> {
    return this.request.get(`${this.baseUrl}movie/popular?${this.API_KEY}&page=${this.popularPage}`)
      .pipe(
        tap(() => this.popularPage++),
      );
  }

  getTopRated(): Observable<any> {
    return this.request.get(`${this.baseUrl}movie/top_rated?${this.API_KEY}&page=${this.topRatedPAge}`)
      .pipe(
        tap(() => this.topRatedPAge++),
      );
  }

  getMovieDetails(id: number | string): Observable<any> {
    return this.request.get(`${this.baseUrl}movie/${id}?${this.API_KEY}`);
  }

  getMovieCast(id: number | string): Observable<any> {
    return this.request.get(`${this.baseUrl}movie/${id}/credits?${this.API_KEY}`);
  }

  getMovieSimilar(id: number | string): Observable<any> {
    return this.request.get(`${this.baseUrl}movie/${id}/similar?${this.API_KEY}`);
  }

  getMovieVideos(id: number | string): Observable<any> {
    return this.request.get(`${this.baseUrl}movie/${id}/videos?${this.API_KEY}`);
  }
}
