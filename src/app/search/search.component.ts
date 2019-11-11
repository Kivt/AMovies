import { Component, OnInit, OnDestroy } from '@angular/core';
import { MoviePreview } from '../classes/movie-preview';
import { ApiMoviesService } from '../api-movies.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  movies: MoviePreview[] = [];
  routeSubscriber$: any;
  isInitial = true;
  isLoading = false;
  isAnimationRunning = false;
  flippedPreviews = {};
  query = '';

  constructor(
    private apiService: ApiMoviesService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.routeSubscriber$ = this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
          this.query = this.route.snapshot.queryParams.q || '';
          this.movies = [];
          this.checkCashedMovies();
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.routeSubscriber$.unsubscribe();
  }

  checkCashedMovies() {
    if (this.query.length) {
      if (this.query === this.apiService.lastSearchQuery) {
        this.animatePreviews(this.apiService.lastSearchResult);
        this.isInitial = false;
      } else {
        this.searchRequest(this.query);
      }
    } else if (this.apiService.lastSearchResult.length) {
      this.animatePreviews(this.apiService.lastSearchResult);
      this.query = this.apiService.lastSearchQuery;
      this.isInitial = false;
    }
  }

  searchRequest(query: string) {
    if (!query) {
      return;
    }
    this.isLoading = true;
    this.isInitial = false;
    this.apiService.search(query)
      .subscribe(
        (data) => {
          this.movies = [];
          this.animatePreviews(data.results);
          this.isLoading = false;
        },
        (err) => {
          this.movies = [];
          this.isLoading = false;
          console.log(err);
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

  animatePreviews(data: MoviePreview[]) {
    this.isAnimationRunning = true;
    setTimeout(() => {
      this.isAnimationRunning = false;
    }, 50 * data.length);

    data.forEach((el, i) => {
      setTimeout(() => {
        this.movies.push(el);
      }, i * 50);
    });
  }
}
