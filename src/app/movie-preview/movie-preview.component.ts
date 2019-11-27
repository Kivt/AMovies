import { Component, Input, Output, EventEmitter, ViewChild, AfterContentInit, OnInit, OnDestroy } from '@angular/core';
import { MoviePreview } from '../classes/movie-preview';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-preview',
  templateUrl: './movie-preview.component.html',
  styleUrls: ['./movie-preview.component.css']
})
export class MoviePreviewComponent implements OnInit, AfterContentInit, OnDestroy {
  @Input() movie: MoviePreview;
  @Input() isFlipped: boolean;
  @Input() index = 0;
  @Output() previewClick: EventEmitter<MoviePreview> = new EventEmitter();
  @Output() detailsClick: EventEmitter<MoviePreview> = new EventEmitter();
  @ViewChild('image') img;
  isImageLoaded = false;
  urlObservable$: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.subscribeToUrlParamsChange();
  }

  ngAfterContentInit() {
    this.loadImage();
  }

  ngOnDestroy() {
    this.urlObservable$.unsubscribe();
  }

  subscribeToUrlParamsChange() {
    this.urlObservable$ = this.route.queryParams.subscribe(() => {
      this.isImageLoaded = false;
    });
  }

  onPreviewClick() {
    this.previewClick.emit(this.movie);
  }

  onDetailsClick(event: Event) {
    event.stopPropagation();
    this.detailsClick.emit(this.movie);
  }

  loadImage() {
    this.isImageLoaded = false;
    const el = this.img.nativeElement;
    el.onload = () => {
      this.isImageLoaded = true;
    };
    el.onerror = () => {
      console.log('error loading image' + this.movie);
    };
    el.src = `https://image.tmdb.org/t/p/w500/${this.movie.poster_path}`;
  }
}
