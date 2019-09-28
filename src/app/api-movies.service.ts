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
  topRatedPAge = 1;
  nowPlayingPage = 1;
  upcomingPage = 1;

  constructor(private request: RequestService) {
    this.getRegion();
  }

  getPopular(): Observable<any> {
    return this.request.get(`${this.baseUrl}movie/popular?${this.API_KEY}&page=${this.popularPage}&region=${this.region}`)
      .pipe(
        tap(() => this.popularPage++),
      );
  }

  getTopRated(): Observable<any> {
    return this.request.get(`${this.baseUrl}movie/top_rated?${this.API_KEY}&page=${this.topRatedPAge}&region=${this.region}`)
      .pipe(
        tap(() => this.topRatedPAge++),
      );
  }

  getNowPlaying(): Observable<any> {
    return this.request.get(`${this.baseUrl}movie/now_playing?${this.API_KEY}&page=${this.topRatedPAge}&region=${this.region}`)
      .pipe(
        tap(() => this.nowPlayingPage++),
      );
  }

  getUpcoming(): Observable<any> {
    return this.request.get(`${this.baseUrl}movie/upcoming?${this.API_KEY}&page=${this.upcomingPage}&region=${this.region}`)
      .pipe(
        tap(() => this.upcomingPage++),
      );
  }

  getMovieDetails(id: number | string): Observable<any> {
    return this.request.get(`${this.baseUrl}movie/${id}?${this.API_KEY}`);
  }

  getRegion() {
    this.request.get('http://ip-api.com/json', false).subscribe((data) => {
      this.region = data.countryCode;
      this.regionUpdated$.next(data.countryCode);
    });
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
