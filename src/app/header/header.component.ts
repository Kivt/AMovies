import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

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
  isAuth = false;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
    this.routeChange$ = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const isLogin = event.url === '/login';
        this.linkTitle = isLogin ? 'Sign Up' : 'Sign In';
        this.linkHref = isLogin ? '/register' : '/login';
      }
    });
  }

  ngOnInit() {
    this.checkAuth();
    this.loginSubscribtion$ = this.authService.loggedIn$
      .subscribe(() => this.checkAuth());
  }

  checkAuth() {
    this.isAuth = this.authService.isAuth();
  }

  ngOnDestroy() {
    this.routeChange$.unsubscribe();
    this.loginSubscribtion$.unsubscribe();
  }

}
