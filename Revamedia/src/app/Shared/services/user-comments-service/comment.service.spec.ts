import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';

import { CommentService } from './comment.service';

fdescribe('CommentService', () => {
  let service: CommentService;
  let baseUrl: string;
  let options: object = {'withCredentials': true, 'observe': `response`};
  let comment: object = {};
  let id: number = 4;
  let reply: object = {};
  let message: object = {};
  let httpClientSpy: {
    get: jasmine.Spy,
    put: jasmine.Spy,
    post: jasmine.Spy,
    delete: jasmine.Spy
  };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj("HttpClient", ['get', 'post', 'put', 'delete']);

    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: httpClientSpy }
      ]
    });
    service = TestBed.inject(CommentService);
    baseUrl = service['baseUrl']; // <-- square bracket accessor hack for private fields

    httpClientSpy.get.and.returnValue(of({}));
    httpClientSpy.put.and.returnValue(of({}));
    httpClientSpy.post.and.returnValue(of({}));
    httpClientSpy.delete.and.returnValue(of({}));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('addComment should return observable called with correct arguments', () => {
    // Arrange
    const url = baseUrl + "/comment/add";

    // Act
    const returnedValue = service.addComment(comment);

    // Assert
    expect(returnedValue).toBeInstanceOf(Observable);
    expect(httpClientSpy.post).toHaveBeenCalledWith(url, comment, options);
  });

  it('getCommentById should return observable called with correct arguments', () => {
    // Arrange
    const url = baseUrl + "/comment/" + id;

    // Act
    const returnedValue = service.getCommentById(id);

    // Assert
    expect(returnedValue).toBeInstanceOf(Observable);
    expect(httpClientSpy.get).toHaveBeenCalledWith(url);
  });

  it('getAllComments should return observable called with correct arguments', () => {
    // Arrange
    const url = baseUrl + "/comment/all";

    // Act
    const returnedValue = service.getAllComments();

    // Assert
    expect(returnedValue).toBeInstanceOf(Observable);
    expect(httpClientSpy.get).toHaveBeenCalledWith(url);
  });

  it('updateComment should return observable called with correct arguments', () => {
    // Arrange
    const url = baseUrl + "/comment/update";

    // Act
    const returnedValue = service.updateComment(comment);

    // Assert
    expect(returnedValue).toBeInstanceOf(Observable);
    expect(httpClientSpy.put).toHaveBeenCalledWith(url, comment, options);
  });

  it('deleteComment should return observable called with correct arguments', () => {
    // Arrange
    const url = baseUrl + "/comment/delete/" + id;

    // Act
    const returnedValue = service.deleteComment(id);

    // Assert
    expect(returnedValue).toBeInstanceOf(Observable);
    expect(httpClientSpy.delete).toHaveBeenCalledWith(url, options);
  });

  it('addReply should return observable called with correct arguments', () => {
    // Arrange
    const url = baseUrl + "/reply/add";

    // Act
    const returnedValue = service.addReply(reply);

    // Assert
    expect(returnedValue).toBeInstanceOf(Observable);
    expect(httpClientSpy.post).toHaveBeenCalledWith(url, reply);
  });

  it('updateReply should return observable called with correct arguments', () => {
    // Arrange
    const url = baseUrl + "/reply/update/" + id;

    // Act
    const returnedValue = service.updateReply(message, id);

    // Assert
    expect(returnedValue).toBeInstanceOf(Observable);
    expect(httpClientSpy.put).toHaveBeenCalledWith(url, message);
  });

  it('deleteReply should return observable called with correct arguments', () => {
    // Arrange
    const url = baseUrl + "/reply/delete/" + id;

    // Act
    const returnedValue = service.deleteReply(id);

    // Assert
    expect(returnedValue).toBeInstanceOf(Observable);
    expect(httpClientSpy.delete).toHaveBeenCalledWith(url);
  });
});
