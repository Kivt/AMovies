import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Component } from '@angular/core';

@Component({selector: 'app-header', template: ''})
class HeaderStubComponent {}

@Component({selector: 'router-outlet', template: ''})
class RouterStubComponent {}

describe('AppComponent', () => {
  let fixture;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderStubComponent,
        RouterStubComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
  }));

  it('should create the app', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
