import { Injectable } from '@angular/core';
import { MoviePreview } from '../classes/movie-preview';
import { ApiMoviesService } from '../api-movies.service';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  popularMovies: MoviePreview[] = [];
  topRatedMovies: MoviePreview[] = [];
  popularMoviesUpdated$ = new ReplaySubject<MoviePreview[]>();
  topRatedMoviesUpdated$ = new ReplaySubject<MoviePreview[]>();
  flippedPreviews = {};

  constructor(private apiService: ApiMoviesService) { }

  getPopularMovies() {
    this.apiService.getPopular().subscribe((data) => {
      this.popularMovies.push(...data.results);
      this.popularMoviesUpdated$.next(this.popularMovies);
    });
  }

  getTopRatedMovies() {
    this.apiService.getTopRated().subscribe((data) => {
      this.topRatedMovies.push(...data.results);
      this.topRatedMoviesUpdated$.next(this.topRatedMovies);
    });
  }

  getFlippedPreviews() {
    return {...this.flippedPreviews};
  }

  flippedPreviewsUpdated(flipped) {
    this.flippedPreviews = flipped;
  }
}
