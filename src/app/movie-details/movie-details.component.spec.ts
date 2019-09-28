import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';
import { MovieDetailsComponent } from './movie-details.component';
import { MoviePreview } from '../classes/movie-preview';

@Component({ selector: 'app-movie-preview', template: '' })
class MoviePreviewComponent {
  @Input() movie: MoviePreview;
  @Input() isFlipped: boolean;
}

@Component({ selector: 'app-movie-videos', template: '' })
class MovieVideosComponent {
  @Input() videos: MoviePreview[];
}

describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;
  let fixture: ComponentFixture<MovieDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterModule.forRoot([]),
      ],
      declarations: [
        MovieDetailsComponent,
        MoviePreviewComponent,
        MovieVideosComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
