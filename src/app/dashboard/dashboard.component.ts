import { Component, OnInit, OnDestroy } from '@angular/core';

import { DashboardService } from './dashboard.service';

import { MoviePreview } from '../classes/movie-preview';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  popularMoviesObservable$: any;
  popularMovies: MoviePreview[] = [];
  flippedPreviews = {};

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.subscibeForPopularMoviesUpdate();
    this.flippedPreviews = this.dashboardService.getFlippedPreviews();

    if (!this.popularMovies.length) {
      this.onMoreClick();
    }
  }

  ngOnDestroy() {
    this.popularMoviesObservable$.unsubscribe();
  }

  onMoreClick() {
    this.dashboardService.getPopularMovies();
  }

  onPreviewClick(movie: MoviePreview) {
    if (this.flippedPreviews[movie.id]) {
      delete this.flippedPreviews[movie.id];
    } else {
      this.flippedPreviews[movie.id] = true;
    }

    this.dashboardService.flippedPreviewsUpdated({...this.flippedPreviews});
  }

  subscibeForPopularMoviesUpdate() {
    this.popularMoviesObservable$ = this.dashboardService.popularMoviesUpdated$
      .subscribe(data =>  this.popularMovies = data);
  }
}
