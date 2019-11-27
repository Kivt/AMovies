import { Component, OnInit, Input } from '@angular/core';
import { ModalVideoService } from './modal-video.service';

@Component({
  selector: 'app-modal-video',
  templateUrl: './modal-video.component.html',
  styleUrls: ['./modal-video.component.css']
})
export class ModalVideoComponent implements OnInit {
  videoId = '';
  isOpen = false;

  constructor(
    private videoService: ModalVideoService,
  ) { }

  ngOnInit() {
    this.subscribeForOpen();
  }

  subscribeForOpen() {
    this.videoService.modalOpened$.subscribe((videoId) => {
      this.open(videoId);
    });
  }

  open(id: string) {
    this.videoId = id;
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
    this.videoId = '';
  }

}
