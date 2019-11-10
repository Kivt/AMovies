import { Component, OnInit } from '@angular/core';
import { MoviePreview } from '../classes/movie-preview';
import { ApiMoviesService } from '../api-movies.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  movies: MoviePreview[] = [];
  isInitial = true;
  isLoading = false;
  flippedPreviews = {};
  query = '';

  constructor(
    private apiService: ApiMoviesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.query = this.route.snapshot.queryParams.q || '';
    this.checkCashedMovies();
  }

  checkCashedMovies() {
    if (this.query.length) {
      if (this.query === this.apiService.lastSearchQuery) {
        this.movies = this.apiService.lastSearchResult;
        this.isInitial = false;
      } else {
        this.searchRequest(this.query);
      }
    } else if (this.apiService.lastSearchResult.length) {
      this.movies = this.apiService.lastSearchResult;
      this.query = this.apiService.lastSearchQuery;
      this.isInitial = false;
    }
  }

  searchRequest(query: string) {
    // TODO: error handling, send if input length > 2, input on enter
    this.isLoading = true;
    this.isInitial = false;
    this.apiService.search(query)
      .subscribe(
        (data) => {
          this.movies = data.results;
          this.isLoading = false;
        },
        (err) => {
          this.movies = [];
          this.isLoading = false;
        }
      );
  }

  onPreviewClick(movie: MoviePreview) {
    if (this.flippedPreviews[movie.id]) {
      delete this.flippedPreviews[movie.id];
    } else {
      this.flippedPreviews[movie.id] = true;
    }
  }
}
