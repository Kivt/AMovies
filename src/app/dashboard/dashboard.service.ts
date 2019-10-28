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
  nowPlayingMovies: MoviePreview[] = [];
  upcomingMovies: MoviePreview[] = [];
  popularMoviesUpdated$ = new ReplaySubject<MoviePreview[]>();
  topRatedMoviesUpdated$ = new ReplaySubject<MoviePreview[]>();
  nowPlayingMoviesUpdated$ = new ReplaySubject<MoviePreview[]>();
  upcomingMoviesUpdated$ = new ReplaySubject<MoviePreview[]>();
  flippedPreviews = {};
  isLoading = false;

  constructor(private apiService: ApiMoviesService) { }

  getMovies(type: string) {
    if (!this.isLoading) {
      const cap = type.charAt(0).toUpperCase() + type.substring(1);
      this.isLoading = true;
      this.apiService[`get${cap}`]().subscribe((data) => {
        this[`${type}Movies`].push(...data.results);
        this[`${type}MoviesUpdated$`].next(this[`${type}Movies`]);
        this.isLoading = false;
      });
    }
  }

  getFlippedPreviews() {
    return {...this.flippedPreviews};
  }

  flippedPreviewsUpdated(flipped) {
    this.flippedPreviews = flipped;
  }
}
