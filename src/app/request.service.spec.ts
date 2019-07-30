import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RequestService } from './request.service';

describe('RequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ]
  }));

  it('should be created', () => {
    const service: RequestService = TestBed.get(RequestService);
    expect(service).toBeTruthy();
  });
});
