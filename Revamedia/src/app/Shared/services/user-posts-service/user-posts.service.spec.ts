import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserPostsService } from './user-posts.service';
import { post } from 'jquery';
import { HttpClient } from '@angular/common/http';
import { timestamp } from 'rxjs';

fdescribe('UserPostsService', () => {
  let service: UserPostsService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let userPostURL: string = "http://localhost:8080/posts";

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers:[UserPostsService] 
    });
    service = TestBed.inject(UserPostsService);
    httpMock = TestBed.inject(HttpTestingController);
    //httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getPostById() should return Observable', () => {
    const dummyPost = {
      postId: 1,
      message: 'test',
      youtubeLink: 'youtube.com',
      image: 'image',
      comments: '',
      ownerId: '',
      likes: '',
      date: 'timestamp',
    }
    service.getPostById(1).subscribe(any => {
      expect(any).toEqual(dummyPost);
    })

  const req = httpMock.expectOne(userPostURL+'/1');
  expect(req.request.method).toBe('GET');
  httpMock.verify();
  })
});
