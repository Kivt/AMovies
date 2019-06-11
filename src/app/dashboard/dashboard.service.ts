import { Injectable } from '@angular/core';
import { Movie } from '../classes/movie';
import { ApiService } from '../api.service';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  popularMovies: Movie[] = [];
  popularMoviesUpdated$ = new ReplaySubject<Movie[]>();
  flippedPreviews = {};

  constructor(private apiService: ApiService) { }

  requestPopularMovies() {
    this.apiService.getPopular().subscribe((data) => {
      this.popularMovies.push(...data.results);
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
