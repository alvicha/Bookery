import { TestBed } from '@angular/core/testing';

import { ResponseService } from './response.service';

describe('ResponseBooksService', () => {
  let service: ResponseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResponseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
