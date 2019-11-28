import { Injectable } from '@angular/core';
import { MoviePreview } from '../classes/movie-preview';
import { ApiMoviesService } from '../api-movies.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  popularMovies = {};
  topRatedMovies = {};
  nowPlayingMovies = {};
  upcomingMovies = {};
  flippedPreviews = {};
  popularMoviesUpdated$ = new Subject<MoviePreview[]>();
  topRatedMoviesUpdated$ = new Subject<MoviePreview[]>();
  nowPlayingMoviesUpdated$ = new Subject<MoviePreview[]>();
  upcomingMoviesUpdated$ = new Subject<MoviePreview[]>();
  isLoading = false;
  popularPage = 1;
  topRatedPage = 1;
  nowPlayingPage = 1;

  topRatedMaxPage = null;
  popularMaxPage = null;
  nowPlayingMaxPage = null;


  constructor(private apiService: ApiMoviesService) { }

  getMovies(type: string, page = 1) {
    if (!this.isLoading) {
      this.updatePage(type, page);
      if (this[`${type}Movies`][page]) {
        this[`${type}MoviesUpdated$`].next(this[`${type}Movies`][page]);
        return;
      }
      const cap = type.charAt(0).toUpperCase() + type.substring(1);
      this.isLoading = true;
      this.apiService[`get${cap}`](page).subscribe((data) => {
        this[`${type}Movies`][page] = data.results;
        this[`${type}MaxPage`] = data.total_pages;
        this[`${type}MoviesUpdated$`].next(data.results);
        this.isLoading = false;
      });
    }
  }

  getPage(type: string) {
    return this[`${type}Page`];
  }

  getMaxPage(type: string) {
    return this[`${type}MaxPage`];
  }

  updatePage(type: string, newPage: number) {
    if (this[`${type}Page`]) {
      this[`${type}Page`] = newPage;
    }
  }

  getFlippedPreviews() {
    return {...this.flippedPreviews};
  }

  flippedPreviewsUpdated(flipped) {
    this.flippedPreviews = flipped;
  }
}
