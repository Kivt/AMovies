import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DashboardService } from './dashboard.service';
import { MoviePreview } from '../classes/movie-preview';
import Helpers from '../helpers';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  moviesObservable$: any;
  movies: MoviePreview[] = [];
  flippedPreviews = {};
  title = '';

  constructor(
    private dashboardService: DashboardService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.title = this.route.snapshot.routeConfig.path;
    this.subscibeForMoviesUpdate(this.route.snapshot.data.type);
    this.flippedPreviews = this.dashboardService.getFlippedPreviews();
    if (!this.movies.length) {
      this.onMoreClick();
    }
  }

  ngOnDestroy() {
    this.moviesObservable$.unsubscribe();
  }

  onMoreClick() {
    const type = Helpers.capitalize(this.route.snapshot.data.type);
    this.dashboardService[`get${type}Movies`]();
  }

  onPreviewClick(movie: MoviePreview) {
    if (this.flippedPreviews[movie.id]) {
      delete this.flippedPreviews[movie.id];
    } else {
      this.flippedPreviews[movie.id] = true;
    }
    this.dashboardService.flippedPreviewsUpdated({...this.flippedPreviews});
  }

  subscibeForMoviesUpdate(type: string) {
    this.moviesObservable$ = this.dashboardService[`${type}MoviesUpdated$`]
      .subscribe(data => this.movies = data);
  }
}
