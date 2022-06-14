import { HttpClient } from '@angular/common/http';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { UserPostsService } from '../user-posts-service/user-posts.service';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let userPostsServiceSpy: { updatePostLikes: jasmine.Spy };
  let httpClientSpy: {
    get: jasmine.Spy,
    put: jasmine.Spy,
    post: jasmine.Spy
  };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClientSpy', ['get', 'put', 'post']);
    userPostsServiceSpy = jasmine.createSpyObj('UserPostsServiceSpy', ['updatePostLikes']);

    TestBed.configureTestingModule({
      providers: [
        // { provide: UserService, useValue: userServiceSpy }
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: UserPostsService, useValue: userPostsServiceSpy },
      ]
    });
    httpClientSpy.get.and.returnValue(of({}));
    service = TestBed.inject(UserService);
  });

  it('should be created', fakeAsync(() => {
    expect(service).toBeTruthy();
  }));
});
