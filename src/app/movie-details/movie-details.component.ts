import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subscription } from 'rxjs';

import { MovieDetails } from '../classes/movie-details';
import { MovieVideo } from '../classes/movie-video';
import { ApiMoviesService } from '../api-movies.service';
import { AuthService } from '../auth/auth.service';
import { MoviePreview } from '../classes/movie-preview';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  details: MovieDetails;
  cast: string;
  movieId: string;
  similarMovies: MoviePreview[];
  videos: MovieVideo[] = [];
  flippedPreviews = {};
  routeSubscribtion$: Subscription;

  isAuth = false;

  constructor(
    private apiService: ApiMoviesService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private ngxService: NgxUiLoaderService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.onPageLoad(this.route.snapshot.params.id);
    this.watchRouteChange();
  }

  ngOnDestroy() {
    this.routeSubscribtion$.unsubscribe();
  }

  watchRouteChange() {
    this.routeSubscribtion$ = this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.onPageLoad(this.route.snapshot.params.id);
      }
    });
  }

  onPageLoad(movieId) {
    this.movieId = movieId;
    this.details = null;
    this.isAuth = this.authService.isAuth();
    this.getDetails();
    this.getMovieCast();
    this.getSimilarMovies();
    this.getVideos();
    this.flippedPreviews = {};
  }

  onPreviewClick(movie: MoviePreview) {
    if (this.flippedPreviews[movie.id]) {
      delete this.flippedPreviews[movie.id];
    } else {
      this.flippedPreviews[movie.id] = true;
    }
  }

  getDetails() {
    this.ngxService.start();
    this.apiService.getMovieDetails(this.movieId)
      .subscribe(data => {
        const arraysToChange = ['production_companies', 'production_countries', 'genres'];
        this.details = data;
        this.arraysToString(arraysToChange);
        this.ngxService.stop();
      });
  }

  arraysToString(arrays: string[]) {
    arrays.forEach(item => {
      this.details[item] = this.arrayToStringList(
        this.details[item],
        'name'
      );
    });
  }

  getMovieCast() {
    this.apiService.getMovieCast(this.movieId)
      .subscribe(data => {
        // TODO: Create page for full crew
        this.cast = this.arrayToStringList(data.cast.slice(0, 5), 'name');
      });
  }

  arrayToStringList(arr: any[], key: string) {
    return arr
      .reduce((acc, val) => {
        return acc + val[key] + ', ';
      }, '')
      .slice(0, -2);
  }

  getSimilarMovies() {
    this.apiService.getMovieSimilar(this.movieId)
      .subscribe(data => {
        this.similarMovies = data.results;
      });
  }

  getVideos() {
    this.apiService.getMovieVideos(this.movieId)
      .subscribe(data => {
        this.videos = data.results;
      });
  }
}
