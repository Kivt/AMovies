import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DashboardService } from './dashboard.service';
import { MoviePreview } from '../classes/movie-preview';
import { ApiMoviesService } from '../api-movies.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  moviesObservable$: any;
  regionObservable$: any;
  movies: MoviePreview[] = [];
  flippedPreviews = {};
  title = '';
  type = '';
  userCountryCode: string = null;
  isAnimationRunning = false;

  constructor(
    private dashboardService: DashboardService,
    private route: ActivatedRoute,
    private apiService: ApiMoviesService,
  ) { }

  ngOnInit() {
    this.type = this.route.snapshot.data.type;
    this.title = this.route.snapshot.routeConfig.path.replace('-', ' ');
    if (!this.userCountryCode) {
      this.subscribeToRegionUpdate();
    } else {
      this.init();
    }
  }

  ngOnDestroy() {
    this.moviesObservable$.unsubscribe();
    this.regionObservable$.unsubscribe();
  }

  subscribeToRegionUpdate() {
    this.regionObservable$ = this.apiService.regionUpdated$
      .subscribe(code => {
        if (code) {
          this.userCountryCode = code;
          this.init();
        }
      });
  }

  init() {
    this.subscibeForMoviesUpdate(this.type);
    const cashed = this.dashboardService.getCurrentMovies(this.type);
    if (cashed.length) {
      this.animatePreviews(cashed);
    } else {
      this.onMoreClick();
    }
    this.flippedPreviews = this.dashboardService.getFlippedPreviews();
  }

  onMoreClick() {
    this.dashboardService.getMovies(this.type);
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
      .subscribe(data => {
        this.animatePreviews(data);
      });
  }

  animatePreviews(data: MoviePreview[]) {
    if (!data.length) {
      return;
    }
    this.isAnimationRunning = true;
    let base = data;
    let rest = [];
    if (data.length > 30) {
      base = data.splice(0, 30);
      rest = data;
    }

    base.forEach((el, i) => {
      setTimeout(() => {
        this.movies.push(el);
      }, i * 50);
    });

    setTimeout(() => {
      this.isAnimationRunning = false;
      if (rest.length) {
        this.movies.push(...rest);
      }
    }, 50 * base.length);
  }
}
