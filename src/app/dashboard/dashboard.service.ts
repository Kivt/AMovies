import { Injectable } from '@angular/core';
import { MoviePreview } from '../classes/movie-preview';
import { ApiService } from '../api.service';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  popularMovies: MoviePreview[] = [];
  popularMoviesUpdated$ = new ReplaySubject<MoviePreview[]>();
  flippedPreviews = {};

  constructor(private apiService: ApiService) { }

  getPopularMovies() {
    this.apiService.getPopular().subscribe((data) => {
      this.popularMovies.push(...data.data);
      this.popularMoviesUpdated$.next([...this.popularMovies]);
    });
  }

  getFlippedPreviews() {
    return {...this.flippedPreviews};
  }

  flippedPreviewsUpdated(flipped) {
    this.flippedPreviews = flipped;
  }
}
