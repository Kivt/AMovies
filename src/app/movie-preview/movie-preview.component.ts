import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MoviePreview } from '../classes/movie-preview';

@Component({
  selector: 'app-movie-preview',
  templateUrl: './movie-preview.component.html',
  styleUrls: ['./movie-preview.component.css']
})
export class MoviePreviewComponent {
  @Input() movie: MoviePreview;
  @Input() isFlipped: boolean;
  @Output() previewClick: EventEmitter<MoviePreview> = new EventEmitter();
  @Output() detailsClick: EventEmitter<MoviePreview> = new EventEmitter();

  onPreviewClick() {
    this.previewClick.emit(this.movie);
  }

  onDetailsClick(event: Event) {
    event.stopPropagation();
    this.detailsClick.emit(this.movie);
  }
}
