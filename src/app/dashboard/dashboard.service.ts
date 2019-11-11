import { Injectable } from '@angular/core';
import { MoviePreview } from '../classes/movie-preview';
import { ApiMoviesService } from '../api-movies.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  popularMovies: MoviePreview[] = [];
  topRatedMovies: MoviePreview[] = [];
  nowPlayingMovies: MoviePreview[] = [];
  upcomingMovies: MoviePreview[] = [];
  popularMoviesUpdated$ = new Subject<MoviePreview[]>();
  topRatedMoviesUpdated$ = new Subject<MoviePreview[]>();
  nowPlayingMoviesUpdated$ = new Subject<MoviePreview[]>();
  upcomingMoviesUpdated$ = new Subject<MoviePreview[]>();
  flippedPreviews = {};
  isLoading = false;

  constructor(private apiService: ApiMoviesService) { }

  getMovies(type: string) {
    if (!this.isLoading) {
      const cap = type.charAt(0).toUpperCase() + type.substring(1);
      this.isLoading = true;
      this.apiService[`get${cap}`]().subscribe((data) => {
        this[`${type}Movies`].push(...data.results);
        this[`${type}MoviesUpdated$`].next(data.results);
        this.isLoading = false;
      });
    }
  }

  getCurrentMovies(type: string) {
    return [...this[`${type}Movies`]];
  }

  getFlippedPreviews() {
    return {...this.flippedPreviews};
  }

  flippedPreviewsUpdated(flipped) {
    this.flippedPreviews = flipped;
  }
}
