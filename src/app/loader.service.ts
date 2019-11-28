import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  stateUpdated$ = new Subject<boolean>();

  constructor() { }

  start() {
    this.stateUpdated$.next(true);
  }

  stop() {
    this.stateUpdated$.next(false);
  }
}
