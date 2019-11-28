import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ApiMoviesService } from './api-movies.service';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('scrollbar') scrollbar;
  isLoader = false;

  constructor(
    private apiService: ApiMoviesService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private loaderService: LoaderService,
  ) { }

  ngOnInit() {
    this.authService.getToken();
    this.subscribeToUrlParamsChange();
    this.subscribeToLoaderStateChange();
    this.apiService.getGenresList();
  }

  subscribeToUrlParamsChange() {
    this.route.queryParams.subscribe(() => {
      // Scroll to top on route change
      if (this.scrollbar.SimpleBar) {
        const el = this.scrollbar.SimpleBar.getScrollElement();
        el.scrollTo({
          top: 0,
        });
      }
    });
  }

  subscribeToLoaderStateChange() {
    this.loaderService.stateUpdated$.subscribe(data => {
      this.isLoader = data;
    });
  }
}
