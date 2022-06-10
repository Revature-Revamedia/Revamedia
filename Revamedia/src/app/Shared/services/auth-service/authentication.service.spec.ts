import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'




fdescribe('AuthenticationService', () => {
  let authService: AuthenticationService;
  let routerSpy: { navigateByUrl: jasmine.Spy };
  let httpClient: HttpClient;
  let httpController: HttpTestingController;
  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    let store: any = {};
    const mockSessionStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };
    spyOn(window.console, 'log');

    spyOn(sessionStorage, 'getItem')
      .and.callFake(mockSessionStorage.getItem);

    spyOn(sessionStorage, 'setItem')
      .and.callFake(mockSessionStorage.setItem);

    spyOn(sessionStorage, 'removeItem')
      .and.callFake(mockSessionStorage.removeItem);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,],
      providers: [AuthenticationService,
        { provide: Router, useValue: routerSpy },


      ],

    });
    authService = TestBed.inject(AuthenticationService);
    httpClient = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpTestingController);


  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('checkLoginStatusReturns true when loginCookie is equal to 1', () => {
    sessionStorage.setItem('loggedIn', '1');
    let result = authService.checkLoginStatus();
    let test = true;
    expect(result).toEqual(test);
  });

  it('checkLoginStatusReturns false when loginCookie is not equal to 1', () => {
    let test = false;
    let result = authService.checkLoginStatus();
    expect(test).toEqual(result);
  });

  it('Login should navigate to homepage if successful', () => {


    const testForm = <NgForm>{
      value: {
        username: "shady",
        password: "Password1!"
      }
    };
    const user = {
      username: "shady",
      password: "Passowrd1!"
    };
    //spyOn(authService.http, 'post').and.returnValue(user as unknown as Observable<any>);
    authService.login(testForm);
    expect(routerSpy.navigateByUrl).toHaveBeenCalled;
    const request = httpController.expectOne(authService.authUrl);
    request.flush(user, { status: 200, statusText: "OK" });
    expect(authService.http.post(authService.authUrl, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      'withCredentials': true, 'observe': `response`
    }).subscribe).toHaveBeenCalled;
    expect(sessionStorage.setItem).toHaveBeenCalled;


  });



  it('Login should not navigate to home page if there was an error ', () => {
    const testForm = <NgForm>{
      value: {
        username: "",
        password: ""
      }
    };
    const user = {
      username: "",
      password: ""
    };
    authService.login(testForm);
    const request = httpController.expectOne(authService.authUrl);
    request.flush(null, { headers: {}, status: 404, statusText: "F in chat" });
    expect(authService.loggedIn).toBeFalse;
    expect(sessionStorage.setItem).not.toHaveBeenCalled;
    expect(routerSpy.navigateByUrl).not.toHaveBeenCalled;



  })


  it('Logout should delete the user cookie and session storage', () => {
    authService.logout();
    expect(authService.loggedIn).toBeFalse;
    expect(sessionStorage.removeItem).toHaveBeenCalledWith('loggedIn');
  });

  it('Logout should navigate to login', () => {
    authService.logout();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/login');
  });

});
