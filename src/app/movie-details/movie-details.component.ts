import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { MovieDetails } from '../classes/movie-details';
import { ApiMoviesService } from '../api-movies.service';
import { AuthService } from '../auth/auth.service';
import { MoviePreview } from '../classes/movie-preview';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  details: MovieDetails;
  cast: string;
  movieId: string;
  similarMovies: MoviePreview[];
  flippedPreviews = {};

  isAuth = false;

  constructor(
    private apiService: ApiMoviesService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private ngxService: NgxUiLoaderService,
  ) { }

  ngOnInit() {
    this.onPageLoad(this.route.snapshot.params.id);
  }

  onPageLoad(movieId) {
    this.movieId = movieId;
    this.details = null;
    this.isAuth = this.authService.isAuth();
    this.getDetails();
    this.getMovieCast();
    this.getSimilarMovies();
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
        this.details = data.data;
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
        this.cast = this.arrayToStringList(data.data.cast, 'name');
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
        this.similarMovies = data.data.results;
      });
  }
}
