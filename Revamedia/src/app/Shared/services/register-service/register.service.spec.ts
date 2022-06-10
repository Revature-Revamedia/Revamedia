import { HttpClient, HttpHeaders, HttpResponse, JsonpClientBackend } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';

import { RegisterService } from './register.service';

describe('RegisterService', () => {

  let httpClientSpy: { post: jasmine.Spy };
  let registerService: RegisterService;
  let baseUrl;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj("HttpClient", ['post']);
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: httpClientSpy }
      ]
    });
    registerService = TestBed.inject(RegisterService);

    baseUrl = registerService.registerUrl;
  });

  // Smoke test
  it('should be created', () => {
    expect(registerService).toBeTruthy();
  });

  // Create User Method
  describe("#createUser", () => {

    let body: object;
    let options: object;
    let httpResponse: HttpResponse<unknown>;

    beforeEach(() => {
      body = {
        username: 'username',
        password: 'password',
        email: 'myEmail@email.com',
        firstName: 'John',
        lastName: 'Doe'
      };

      options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };

      httpResponse = {} as HttpResponse<any>;
    });

    it("Should create and return an observable", () => {
      // Arrange
      httpClientSpy.post.and.returnValue(of(httpResponse));

      // Act
      let returnedObservable: Observable<any> = registerService.createUser(body, options);

      // Assert
      expect(returnedObservable).toBeInstanceOf(Observable);
    });

    it("Should create an http request that sends body and options that are passed into method", () => {
      // Arrange
      httpClientSpy.post.and.returnValue(of(httpResponse));

      // Act
      registerService.createUser(body, options);

      // Assert
      expect(httpClientSpy.post).toHaveBeenCalledWith(registerService.registerUrl, JSON.stringify(body), options);
    });

  })

  it('errorHandler should return an observable that will error when subscribed when parameter.error is an ErrorEvent', () => {
    // Arrange
    const error: { error: ErrorEvent } = {
      error: new ErrorEvent('test', { message: "Error message" })
    };
    console.log(error.error instanceof ErrorEvent);

    // Act
    const returnedErrorObservable: Observable<never> = registerService.errorHandler(error);

    // Assert
    returnedErrorObservable.subscribe(errorMessage => {
      expect(errorMessage).toEqual(error.error.message);
    });
  });

  it('errorHandler should return an observable that will error when subscribed when parameter.error is not an ErrorEvent', () => {
    // Arrange
    const error: { status: any, error: any} = {
      status: 200,
      error: {
        message: "Error message",
        firstName: "John",
        lastName: "Doe",
        email: "email@email.com",
        username: "username1",
        password: "myPassw0rd"
      }
    };

    const expectedErrorMessage = {
      errorStatus: 202,
      errorFirstName: "John",
      errorLastName: "Doe",
      errorEmail: "email@email.com",
      errorUsername: "username1",
      errorPassword: "myPassw0rd"
    };

      // Act
      const returnedErrorObservable: Observable<never> = registerService.errorHandler(error);

      // Assert
      returnedErrorObservable.subscribe(errorMessage => {
        expect(errorMessage).toEqual(expectedErrorMessage);
      });

    });


  });

