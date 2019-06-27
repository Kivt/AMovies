import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { RouterStateService } from '../router-state.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  email = '';
  password = '';
  prevUrl = '';

  constructor(
    private authService: AuthService,
    private routerStateService: RouterStateService,
    private router: Router,
  ) { }

  onFormSubmit() {
    this.authService.login(this.email, this.password)
      .subscribe((data: { data: { token: string } }) => {
        this.authService.setToken(data.data.token);
        this.goPrevUrl();
      });
  }

  goPrevUrl() {
    this.router.navigateByUrl(this.getPrevUrl());
  }

  getPrevUrl() {
    const prevUrl = this.routerStateService.getPrevUrl();
    const currentUrl = this.routerStateService.getCurrentUrl();
    return  prevUrl === currentUrl ? '/' : prevUrl;
  }

}
