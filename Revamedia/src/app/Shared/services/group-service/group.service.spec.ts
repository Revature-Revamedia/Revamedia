import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { GroupService } from './group.service';

describe('GroupService', () => {
  let service: GroupService;

  let httpClientSpy: {
    get: jasmine.Spy,
    post: jasmine.Spy,
    put: jasmine.Spy,
    delete: jasmine.Spy,
  };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClientSpy', ['get', 'post', 'put', 'delete']);
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: httpClientSpy },
      ]
    });
    service = TestBed.inject(GroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
