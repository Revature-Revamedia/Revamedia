import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../user-service/user.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

describe('AuthenticationService', () => {
  let authService: AuthenticationService;
  let httpSpy: { post: jasmine.Spy };
  let routerSpy: { navigateByUrl: jasmine.Spy };
  let cookieServiceSpy: { deleteAll: jasmine.Spy };
  let userServiceSpy: {
    getUser: jasmine.Spy,
    setCurrentUser: jasmine.Spy
  };
  let apiBaseUrl: string;
  const error = { message: "Error message"} as HttpErrorResponse;

  beforeEach(() => {
    httpSpy = jasmine.createSpyObj('HttpClient', ['post']);
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    userServiceSpy = jasmine.createSpyObj('UserServiceSpy', ['getUser', 'setCurrentUser']);
    cookieServiceSpy = jasmine.createSpyObj('CookieServiceSpy', ['deleteAll']);

    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      providers: [
        { provide: HttpClient, useValue: httpSpy },
        { provide: Router, useValue: routerSpy },
        { provide: UserService, useValue: userServiceSpy },
        { provide: CookieService, useValue: cookieServiceSpy },
      ],

    });
    authService = TestBed.inject(AuthenticationService);
    apiBaseUrl = authService.authUrl;
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('checkLoginStatus returns true when logged in', () => {
    spyOn(sessionStorage, 'getItem').withArgs('loggedIn').and.returnValue("1");

    const returnedValue: boolean = authService.checkLoginStatus();

    expect(returnedValue).toEqual(true);
  });

  it('checkLoginStatus returns false not logged in', () => {
    spyOn(sessionStorage, 'getItem').withArgs('loggedIn').and.returnValue("0");

    const returnedValue: boolean = authService.checkLoginStatus();

    expect(returnedValue).toEqual(false);
  });

  describe('#login', () => {
    const loginForm = { value: {
        username: "JoeShmo3",
        password: "p4ssw0rd"
      }
    } as NgForm;
    let httpResponse: HttpResponse<any>;

    beforeEach(() => {
      httpResponse = {
        body: {
          userId: "4",
          username: "JJoy33",
          status: ''
        }
      } as HttpResponse<any>;
    })

    it('should post a request to login endpoint and redirect to /home', fakeAsync(() => {
      httpSpy.post.and.returnValue(of(httpResponse));
      spyOn(sessionStorage, 'setItem');
      spyOn(authService.loggedIn, 'next');
      const loggedInUser = { userId: 4, username: "bob", firstName: "Bob", lastName: "Smith" };
      userServiceSpy.getUser.and.returnValue(loggedInUser);

      authService.login(loginForm);
      tick();

      expect(sessionStorage.setItem).toHaveBeenCalledWith('userId', httpResponse.body.userId);
      expect(sessionStorage.setItem).toHaveBeenCalledWith('username', httpResponse.body.username);
      expect(sessionStorage.setItem).toHaveBeenCalledWith('loggedIn', "1");

      expect(userServiceSpy.setCurrentUser).toHaveBeenCalledOnceWith(loggedInUser);
      expect(authService.loggedIn.next).toHaveBeenCalledOnceWith(true);
      expect(routerSpy.navigateByUrl).toHaveBeenCalledOnceWith('/home');
    }));

    it('should post a request to login endpoint and redirect to /home', fakeAsync(() => {
      httpResponse.body.status = 'redirect';
      httpSpy.post.and.returnValue(of(httpResponse));

      authService.login(loginForm);
      tick();

      expect(routerSpy.navigateByUrl).toHaveBeenCalledOnceWith('/login/twofa', { state : { username : httpResponse.body.username} } );
    }));

    it('should display error and log it on fail', fakeAsync(() => {
      const div = document.createElement('div');
      spyOn(document, "getElementById").and.returnValue(div);
      spyOn(console, 'log');
      httpSpy.post.and.returnValue(throwError(() => error));

      authService.login(loginForm);
      tick();

      expect(div.style.display).toEqual("flex");
      expect(console.log).toHaveBeenCalledOnceWith(error);
    }));
  });

  describe('#loginWithTwoFactor', () => {
    const userData = { username: "Joey3" };
    let httpResponse = {
        userId: "4",
        username: "JJoy33",
        email: 'joey@email.com'
    };
    const loginForm = { value: {
      username: "Joey3",
      password: "p4ssw0rd"
    }
  } as NgForm;

  it('should post a request to twoFactor endpoint and redirect to /home', fakeAsync(() => {
    httpSpy.post.and.returnValue(of(httpResponse));
    spyOn(sessionStorage, 'setItem');
    spyOn(authService.loggedIn, 'next');
    const loggedInUser = { userId: 4, username: "bob", firstName: "Bob", lastName: "Smith" };
    userServiceSpy.getUser.and.returnValue(loggedInUser);

    authService.loginWithTwoFactor(userData, loginForm);
    tick();

    expect(sessionStorage.setItem).toHaveBeenCalledWith('userId', httpResponse.userId);
    expect(sessionStorage.setItem).toHaveBeenCalledWith('username', httpResponse.username);
    expect(sessionStorage.setItem).toHaveBeenCalledWith('email', httpResponse.email);

    expect(sessionStorage.setItem).toHaveBeenCalledWith('loggedIn', "1");

    expect(userServiceSpy.setCurrentUser).toHaveBeenCalledOnceWith(loggedInUser);
    expect(authService.loggedIn.next).toHaveBeenCalledOnceWith(true);
    expect(routerSpy.navigateByUrl).toHaveBeenCalledOnceWith('/home');
  }));

  it('should display error and log it on fail', fakeAsync(() => {
    const div = document.createElement('div');
    spyOn(document, "getElementById").and.returnValue(div);
    spyOn(console, 'log');
    httpSpy.post.and.returnValue(throwError(() => error));

    authService.loginWithTwoFactor(userData, loginForm);
    tick();

    expect(div.style.display).toEqual("flex");
    expect(console.log).toHaveBeenCalledOnceWith(error);
  }));
  });

  it('#logout should log a user out and navigate to login', () => {
    spyOn(authService.loggedIn, 'next');
    spyOn(sessionStorage, 'removeItem');

    authService.logout();

    expect(authService.loggedIn.next).toHaveBeenCalledOnceWith(false);
    expect(sessionStorage.removeItem).toHaveBeenCalledOnceWith('loggedIn');
    expect(routerSpy.navigateByUrl).toHaveBeenCalledOnceWith('/login');
    expect(cookieServiceSpy.deleteAll).toHaveBeenCalledTimes(1);
  });
});
