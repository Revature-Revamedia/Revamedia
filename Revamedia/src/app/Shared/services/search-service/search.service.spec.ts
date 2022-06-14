import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { SearchService } from './search.service';

describe('SearchService', () => {
  let service: SearchService;
  let httpClientSpy: { post: jasmine.Spy };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClientSpy', ['post']);
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: httpClientSpy },
      ]
    });
    service = TestBed.inject(SearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
