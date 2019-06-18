import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) { }
  linkTitle = '';
  linkHref = '';

  ngOnInit() {
    // console.log(this.route.snapshot);
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const isLogin = event.url === '/login';
        this.linkTitle = isLogin ? 'Sing Up' : 'Sign In';
        this.linkHref = isLogin ? '/register' : '/login';
      }
    });
  }

}
