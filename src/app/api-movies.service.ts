import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RequestService } from './request.service';
import { MoviePreview } from './classes/movie-preview';

interface Genre {
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiMoviesService {
  private API_KEY = 'api_key=f50853c92ba860fc68991df84a4c209b';
  private baseUrl = 'https://api.themoviedb.org/3/';
  regionUpdated$ = new BehaviorSubject<string>(null);
  genresUpdated$ = new BehaviorSubject<Genre>(null);
  lastSearchQuery = '';
  lastSearchResult: MoviePreview[] = [];
  region = '';
  genres: Genre = null;

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

  getGenresList() {
    return this.request.get(`${this.baseUrl}genre/movie/list?${this.API_KEY}`)
      .subscribe(data => {
        this.genres = data.genres.reduce((acc, el) => {
          acc[el.id] = el.name;
          return acc;
        }, {});
        this.genresUpdated$.next(this.genres);
      });
  }

  getPopular(page: number = 1): Observable<any> {
    return this.request.get(`${this.baseUrl}movie/popular?${this.API_KEY}&page=${page}&region=${this.region}`);
  }

  getTopRated(page: number = 1): Observable<any> {
    return this.request.get(`${this.baseUrl}movie/top_rated?${this.API_KEY}&page=${page}&region=${this.region}`);
  }

  getNowPlaying(page: number = 1): Observable<any> {
    return this.request.get(`${this.baseUrl}movie/now_playing?${this.API_KEY}&region=${this.region}&page=${page}`);
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
