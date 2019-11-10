import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AppRoutingModule } from './app-routing.module';
import { MoviePreviewComponent } from './movie-preview/movie-preview.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieVideosComponent } from './movie-videos/movie-videos.component';
import { ModalVideoComponent } from './modal-video/modal-video.component';
import { HeaderSearchComponent } from './header-search/header-search.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    MoviePreviewComponent,
    LoginFormComponent,
    RegistrationFormComponent,
    MovieDetailsComponent,
    MovieVideosComponent,
    ModalVideoComponent,
    HeaderSearchComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxUiLoaderModule,
    NgxYoutubePlayerModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
