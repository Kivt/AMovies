import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ApiMoviesService } from '../api-movies.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  routeChange$: Subscription;
  loginSubscribtion$: Subscription;

  linkTitle = '';
  linkHref = '';
  activeRoute = '';
  search = '';
  isAuth = false;
  isMenuOpened = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.routeChange$ = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // const isLogin = event.url === '/login';
        // this.linkTitle = isLogin ? 'Sign Up' : 'Sign In';
        // this.linkHref = isLogin ? '/register' : '/login';
        this.activeRoute = event.urlAfterRedirects;
      }
    });
  }

  ngOnInit() {
    this.checkAuth();
    this.loginSubscribtion$ = this.authService.loggedIn$
      .subscribe(() => this.checkAuth());
  }

  toggleMenu(isOpen: boolean) {
    this.isMenuOpened = isOpen;
  }

  checkAuth() {
    this.isAuth = this.authService.isAuth();
  }

  ngOnDestroy() {
    this.routeChange$.unsubscribe();
    this.loginSubscribtion$.unsubscribe();
  }

}
