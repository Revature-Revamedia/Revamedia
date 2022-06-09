import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserPostsService } from './user-posts.service';
import { post } from 'jquery';
import { HttpClient } from '@angular/common/http';
import { timestamp, Observable } from 'rxjs';
import { identifierName } from '@angular/compiler';

describe('UserPostsService', () => {
  let service: UserPostsService;
  let httpMock: HttpTestingController;
  let userPostURL: string;
  let dummyPost: object = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers:[UserPostsService] 
    });
    service = TestBed.inject(UserPostsService);
    httpMock = TestBed.inject(HttpTestingController);
    userPostURL = service['userPostURL'];
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('UserPostsService should be created', () => {
    expect(service).toBeTruthy();
  });

  it('addPost() should POST and return observable', () => {
    service.addPost(dummyPost).subscribe(any =>{
      expect(any).toBeInstanceOf(Observable);
    })
    const req = httpMock.expectOne(userPostURL+'/addPost');
    expect(req.request.method).toBe('POST');
  })

  it('getPostById() should GET & return observable', () => {
    service.getPostById(1).subscribe(any => {
      expect(any).toBeInstanceOf(Observable);
    })

  const req = httpMock.expectOne(userPostURL+'/1');
  expect(req.request.method).toBe('GET');
  })

  it('updatePost() should POST and return updated observable', () => {
    let newObservable = service.updatePost(dummyPost);
    
    expect(newObservable).toBeInstanceOf(Observable);

    const req = httpMock.expectOne(userPostURL+'/updatePost');
    expect(req.request.method).toBe('PUT');
  })

  it('deletePost() should DELETE post by ID and return observable', () => {
    const url = userPostURL+"/delete/"+1;
    service.deletePost(1).subscribe(any => {
      expect(any).toBeInstanceOf(Observable);
    })
    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe('DELETE');
  })
});
