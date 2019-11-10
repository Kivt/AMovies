import { Component, OnInit } from '@angular/core';
import { MoviePreview } from '../classes/movie-preview';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  isInitial = true;
  movies: MoviePreview[] = [];

  constructor() { }

  ngOnInit() {
  }

}
