import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { UploadService } from './upload.service';

describe('UploadService', () => {
  let service: UploadService;

  let httpClientSpy: { post: jasmine.Spy, delete: jasmine.Spy };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClientSpy', ['post', 'delete']);

    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: httpClientSpy },
      ]
    });
    service = TestBed.inject(UploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
