import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class ApiMoviesService {
  private API_KEY = 'api_key=f50853c92ba860fc68991df84a4c209b';
  private baseUrl = 'https://api.themoviedb.org/3/';
  regionUpdated$ = new ReplaySubject<any>();
  region = '';
  popularPage = 1;
  topRatedPage = 1;

  constructor(private request: RequestService) {
    this.getRegion();
  }

  search(query: string): Observable<any> {
    return this.request.get(`${this.baseUrl}search/movie?${this.API_KEY}&page=1&query=${query}`);
  }

  getPopular(): Observable<any> {
    return this.request.get(`${this.baseUrl}movie/popular?${this.API_KEY}&page=${this.popularPage}&region=${this.region}`)
      .pipe(
        tap(() => this.popularPage++),
      );
  }

  getTopRated(): Observable<any> {
    return this.request.get(`${this.baseUrl}movie/top_rated?${this.API_KEY}&page=${this.topRatedPage}&region=${this.region}`)
      .pipe(
        tap(() => this.topRatedPage++),
      );
  }

  getNowPlaying(): Observable<any> {
    return this.request.get(`${this.baseUrl}movie/now_playing?${this.API_KEY}&region=${this.region}`);
  }

  getUpcoming(): Observable<any> {
    return this.request.get(`${this.baseUrl}movie/upcoming?${this.API_KEY}&region=${this.region}`);
  }

  getMovieDetails(id: number | string): Observable<any> {
    return this.request.get(`${this.baseUrl}movie/${id}?${this.API_KEY}`);
  }

  getRegion() {
    this.request.get('https://get.geojs.io/v1/ip/country.json', false).subscribe(
      (data) => {
        this.region = data.country;
        this.regionUpdated$.next(data.country);
      },
      (err) => {
        console.log(err);
        this.region = 'US';
        this.regionUpdated$.next('US');
      }
    );
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
