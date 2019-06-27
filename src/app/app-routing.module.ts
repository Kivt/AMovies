import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { AuthOnlyPublicGuard } from './auth/auth-only-public.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginFormComponent,
    canActivate: [AuthOnlyPublicGuard],
  },
  {
    path: 'movie/:id',
    component: MovieDetailsComponent,
  },
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: '**',
    redirectTo: '',
  }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ],
})
export class AppRoutingModule { }
