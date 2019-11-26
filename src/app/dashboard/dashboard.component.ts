import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
  isAnimationRunning = true;
  maxPage = null;
  isPagination = false;
  currentPage = 1;

  constructor(
    private dashboardService: DashboardService,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiMoviesService,
  ) { }

  ngOnInit() {
    this.type = this.route.snapshot.data.type;
    this.isPagination = this.route.snapshot.data.pagination;
    this.title = this.route.snapshot.routeConfig.path.replace('-', ' ');
    this.subscribeToUrlParamsChange();
    if (!this.userCountryCode) {
      this.subscribeToRegionUpdate();
    } else {
      this.init();
    }
  }

  subscribeToUrlParamsChange() {
    this.route.queryParams.subscribe(data => {
      if (!data.page) {
        const lastPage = this.dashboardService.getPage(this.type);
        this.updateUrlQuery(lastPage);
        this.currentPage = lastPage;
      } else {
        this.currentPage = this.validatePage(data.page);
      }
    });
  }

  validatePage(num: string): number {
    const n = Number.parseInt(num, 10);
    return isNaN(n) ? 1 : n;
  }

  updateUrlQuery(page: number) {
    this.currentPage = page;
    this.router.navigate([], {
      queryParams: {
        page,
      }
    });
  }

  onPaginationChange(num: number) {
    this.updateUrlQuery(num);
    this.getMovies();
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
    this.getMovies();
    this.flippedPreviews = this.dashboardService.getFlippedPreviews();
  }

  getMovies() {
    this.dashboardService.getMovies(this.type, this.currentPage);
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
        this.movies = [];
        this.animatePreviews(data);
        this.maxPage = this.dashboardService.getMaxPage(this.type);
      });
  }

  animatePreviews(data: MoviePreview[]) {
    if (!data.length) {
      return;
    }
    this.isAnimationRunning = true;

    data.forEach((el, i) => {
      setTimeout(() => {
        this.movies.push(el);
      }, i * 50);
    });

    setTimeout(() => {
      this.isAnimationRunning = false;
    }, 50 * data.length);
  }
}
