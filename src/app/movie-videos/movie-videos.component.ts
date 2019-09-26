import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MovieVideo } from '../classes/movie-video';

@Component({
  selector: 'app-movie-videos',
  templateUrl: './movie-videos.component.html',
  styleUrls: ['./movie-videos.component.css']
})
export class MovieVideosComponent implements OnInit {
  @Input() videos: MovieVideo[] = [];
  @ViewChild('modalVideo') modal;
  constructor() { }

  ngOnInit() {
  }

  openVideo(key: string) {
    this.modal.open(key);
  }
}
