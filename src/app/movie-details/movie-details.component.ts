import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import { Subscription } from 'rxjs';

import { MovieDetails } from '../classes/movie-details';
import { MovieVideo } from '../classes/movie-video';
import { ApiMoviesService } from '../api-movies.service';
import { AuthService } from '../auth/auth.service';
import { MoviePreview } from '../classes/movie-preview';
import { ModalVideoService } from '../modal-video/modal-video.service';

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
    private router: Router,
    private videoService: ModalVideoService,
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

  openVideo(id: string) {
    this.videoService.play(id);
  }

  formatNumber(val: string) {
    let str = '' + val;
    if (str.length > 3) {
      str = str.replace(/\s/g, '').split('').reverse().join('');
      str = str.match(/.{1,3}/g).join(' ');
      str = str.split('').reverse().join('');
    }
    return str;
  }

  getDetails() {
    this.apiService.getMovieDetails(this.movieId)
      .subscribe(data => {
        const arraysToChange = ['production_companies', 'production_countries', 'genres'];
        this.details = data;
        this.arraysToString(arraysToChange);
      });
  }

  arraysToString(arrays: string[]) {
    arrays.forEach(item => {
      this.details[item] = this.arrayToStringList(this.details[item], 'name');
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
      .reduce((acc, val) => acc + val[key] + ', ', '')
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
