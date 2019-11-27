import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('scrollbar') scrollbar;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.authService.getToken();
    this.subscribeToUrlParamsChange();
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
}
