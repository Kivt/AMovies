import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-modal-video',
  templateUrl: './modal-video.component.html',
  styleUrls: ['./modal-video.component.css']
})
export class ModalVideoComponent implements OnInit {
  videoId = '';
  isOpen = false;

  constructor() { }

  ngOnInit() {
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
