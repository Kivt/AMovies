import { Component, OnInit } from '@angular/core';
import { ApiMoviesService } from '../api-movies.service';
import { MoviePreview } from '../classes/movie-preview';

@Component({
  selector: 'app-header-search',
  templateUrl: './header-search.component.html',
  styleUrls: ['./header-search.component.css']
})
export class HeaderSearchComponent implements OnInit {
  timeout = null;
  doneTypingInterval = 350;
  movies: MoviePreview[] = [];
  isVisible = false;
  isLoading = false;
  inputValue = '';

  constructor(
    private apiService: ApiMoviesService,
  ) { }

  ngOnInit() {
  }

  onSearchInput(e) {
    clearTimeout(this.timeout);
    if (e.target.value.length > 2) {
      this.timeout = setTimeout(() => {
        this.searchRequest(e.target.value);
      }, this.doneTypingInterval);
    } else {
      this.isVisible = false;
    }
  }

  searchRequest(query: string) {
    this.isLoading = true;
    this.apiService.search(query)
      .subscribe((data) => {
        this.movies = data.results.slice(0, 5);
        this.isVisible = true;
        this.isLoading = false;
      });
  }
}
