import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ApiMoviesService } from '../api-movies.service';
import { MoviePreview } from '../classes/movie-preview';

@Component({
  selector: 'app-header-search',
  templateUrl: './header-search.component.html',
  styleUrls: ['./header-search.component.css']
})
export class HeaderSearchComponent implements OnInit, OnDestroy {
  timeout = null;
  doneTypingInterval = 350;
  movies: MoviePreview[] = [];
  isVisible = false;
  isLoading = false;
  inputValue = '';

  @ViewChild('searchInput') searchInputRef;

  constructor(
    private apiService: ApiMoviesService,
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.handleGlobalClick);
  }

  onSearchInput(e) {
    clearTimeout(this.timeout);
    if (e.target.value.length > 2) {
      this.timeout = setTimeout(() => {
        this.searchRequest(e.target.value);
      }, this.doneTypingInterval);
    } else {
      this.isVisible = false;
      this.movies = [];
    }
  }

  onSearchForcus() {
    if (!this.isVisible && this.movies.length) {
      this.isVisible = true;
      document.addEventListener('click', this.handleGlobalClick);
    }
  }

  searchRequest(query: string) {
    this.isLoading = true;
    this.apiService.search(query)
      .subscribe((data) => {
        this.movies = data.results.slice(0, 5);
        this.isVisible = true;
        this.isLoading = false;
        document.addEventListener('click', this.handleGlobalClick);
      });
  }

  handleGlobalClick = (e) => {
    const el = e.target.closest('input') || e.target;
    if (!el.isEqualNode(this.searchInputRef.nativeElement)) {
      this.isVisible = false;
      document.removeEventListener('click', this.handleGlobalClick);
    }
  }
}
