/**
 * @Author: Giorgi Amirajibi, ...
 * @Contributor: Jarod Heng
 */

import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { UserService } from '../user-service/user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public loggedIn = new BehaviorSubject<boolean>(this.checkLoginStatus());

  constructor(private router: Router, private http: HttpClient, private cookieService: CookieService, private userService: UserService) { }

  checkLoginStatus(): boolean {
    var loginCookie = sessionStorage.getItem('loggedIn');
    if (loginCookie == "1") {
      return true;
    } else {
      return false;
    }
  }

  authUrl: string = environment.apiBaseUrl + "/auth/login";
  public login(loginForm: NgForm) {

    let user = {
      username: loginForm.value.username,
      password: loginForm.value.password
    }

    //Post request to attempt to login the user

    this.http.post(this.authUrl, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      'withCredentials': true, 'observe': `response`
    }).subscribe((response: any) => {
      let loggedInUser: any;
      console.log(response);
      if(response.body.status != 'redirect'){
        sessionStorage.setItem('userId', response.body.userId.toString());
        sessionStorage.setItem('username', response.body.username);
        sessionStorage.setItem('loggedIn', "1");
        console.log(sessionStorage.getItem('username'));
        loggedInUser = this.userService.getUser();
        console.log(loggedInUser);
        this.userService.setCurrentUser(loggedInUser);
  
        this.loggedIn.next(true);
        this.router.navigateByUrl('/home');
      }
      else{
        this.router.navigateByUrl('/login/twofa');
      }
      
    }, (error: HttpErrorResponse) => {
      document.getElementById('invalid')!.style.display = "flex";
      console.log(error);
    })

  }

  public loginWithTwoFactor(twoFactorForm: NgForm) {

    let sixDigitCode : any = {
      "sixDigitCode" : twoFactorForm.value.sixDigitCode
    } 
    console.log(sixDigitCode);

    this.http.post(this.authUrl+"/twoFA", sixDigitCode, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      'withCredentials': true, 'observe': `response`
    }).subscribe((response: any) => {
      let loggedInUser: any;
      console.log(response);
      if(response.body != 'redirect'){
        sessionStorage.setItem('userId', response.body.userId.toString());
        sessionStorage.setItem('username', response.body.username);
        sessionStorage.setItem('loggedIn', "1");
        console.log(sessionStorage.getItem('username'));
        loggedInUser = this.userService.getUser();
        console.log(loggedInUser);
        this.userService.setCurrentUser(loggedInUser);
  
        this.loggedIn.next(true);
        this.router.navigateByUrl('/home');
      }
      else{
        this.router.navigateByUrl('/login/twofa');
      }
      
    }, (error: HttpErrorResponse) => {
      document.getElementById('invalid')!.style.display = "flex";
      console.log(error);
    })

  }

  public logout() {
    this.loggedIn.next(false);
    sessionStorage.removeItem('loggedIn');
    this.router.navigateByUrl('/login');
    this.cookieService.deleteAll();
  }
}
