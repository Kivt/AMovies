import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RequestService } from './request.service';
import { MoviePreview } from './classes/movie-preview';

@Injectable({
  providedIn: 'root'
})
export class ApiMoviesService {
  private API_KEY = 'api_key=f50853c92ba860fc68991df84a4c209b';
  private baseUrl = 'https://api.themoviedb.org/3/';
  regionUpdated$ = new BehaviorSubject<string>(null);
  lastSearchQuery = '';
  lastSearchResult: MoviePreview[] = [];
  region = '';
  language = navigator ? navigator.language : 'en';

  constructor(private request: RequestService) {
    this.getRegion();
  }

  search(query: string, page: number = 1): Observable<any> {
    this.lastSearchQuery = query;
    return this.request.get(`${this.baseUrl}search/movie?${this.API_KEY}&page=${page}&query=${query}&include_adult=false`)
      .pipe(
        tap((data) => { this.lastSearchResult = data.results; }),
      );
  }

  getPopular(page: number = 1): Observable<any> {
    return this.request.get(`${this.baseUrl}movie/popular?${this.API_KEY}&page=${page}&region=${this.region}&language=${this.language}`);
  }

  getTopRated(page: number = 1): Observable<any> {
    return this.request.get(`${this.baseUrl}movie/top_rated?${this.API_KEY}&page=${page}&region=${this.region}&language=${this.language}`);
  }

  getNowPlaying(page: number = 1): Observable<any> {
    return this.request
      .get(`${this.baseUrl}movie/now_playing?${this.API_KEY}&region=${this.region}&page=${page}&language=${this.language}`);
  }

  getUpcoming(): Observable<any> {
    return this.request.get(`${this.baseUrl}movie/upcoming?${this.API_KEY}&region=${this.region}&language=${this.language}`);
  }

  getMovieDetails(id: number | string): Observable<any> {
    return this.request.get(`${this.baseUrl}movie/${id}?${this.API_KEY}&language=${this.language}`);
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
        this.region = 'US';
        this.regionUpdated$.next('US');
      }
    );
  }

  getMovieCast(id: number | string): Observable<any> {
    return this.request.get(`${this.baseUrl}movie/${id}/credits?${this.API_KEY}&language=${this.language}`);
  }

  getMovieSimilar(id: number | string): Observable<any> {
    return this.request.get(`${this.baseUrl}movie/${id}/similar?${this.API_KEY}&language=${this.language}`);
  }

  getMovieVideos(id: number | string): Observable<any> {
    return this.request.get(`${this.baseUrl}movie/${id}/videos?${this.API_KEY}&language=${this.language}`);
  }
}
