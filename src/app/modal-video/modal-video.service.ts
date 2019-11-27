import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalVideoService {
  modalOpened$ = new Subject<string>();

  constructor() { }

  play(videoId: string) {
    this.modalOpened$.next(videoId);
  }
}
