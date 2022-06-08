import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserPostsService } from './user-posts.service';
import { post } from 'jquery';
import { HttpClient } from '@angular/common/http';
import { timestamp, Observable } from 'rxjs';

fdescribe('UserPostsService', () => {
  let service: UserPostsService;
  let httpMock: HttpTestingController;
  //let httpClient: HttpClient;
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

  it('UserPostsService should be created', () => {
    expect(service).toBeTruthy();
  });

  it('addPost() should POST and return observable', () => {
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
    service.addPost(dummyPost).subscribe(any =>{
      expect(any).toBeInstanceOf(Observable);
    })
    const req = httpMock.expectOne(userPostURL+'/addPost');
    expect(req.request.method).toBe('POST');
    //req.flush(dummyPost);
  })

  it('getPostById() should GET & return observable', () => {
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
  req.flush(dummyPost);
  })

  it('updatePost() should POST and return updated observable', () => {
    let dummyPost = {
      postId: 1,
      message: 'test',
      youtubeLink: 'youtube.com',
      image: 'image',
      comments: '',
      ownerId: '',
      likes: '',
      date: 'timestamp',
    }
    let returnedObservable: Observable<any> = service.addPost(1);

    dummyPost.message = 'this is a new test';
    dummyPost.date = '06/08/2022';
    let newObservable: Observable<any> = service.updatePost(dummyPost);
    

    expect(newObservable).toBeInstanceOf(Observable);
    expect(newObservable).not.toEqual(returnedObservable);

    const req = httpMock.expectOne(userPostURL+'/updatePost');
    expect(req.request.method).toBe('POST');
    //req.flush(dummyPost);
  })
});
