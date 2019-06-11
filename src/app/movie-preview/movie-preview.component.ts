import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from '../classes/movie';

@Component({
  selector: 'app-movie-preview',
  templateUrl: './movie-preview.component.html',
  styleUrls: ['./movie-preview.component.css']
})
export class MoviePreviewComponent {
  @Input() movie: Movie;
  @Input() isFlipped: boolean;
  @Output() previewClick: EventEmitter<Movie> = new EventEmitter();

  onPreviewClick() {
    this.previewClick.emit(this.movie);
  }
}
