import { Injectable } from '@angular/core';
import { Router, NavigationEnd, Scroll } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RouterStateService {
  previousUrl = '';
  currentUrl = '';

  constructor(
    private router: Router
  ) {
    this.currentUrl = this.router.url;
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      });
  }

  getPrevUrl() {
    return this.previousUrl;
  }

  getCurrentUrl() {
    return this.currentUrl;
  }
}
