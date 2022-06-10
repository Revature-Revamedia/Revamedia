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


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public loggedIn = new BehaviorSubject<boolean>(this.checkLoginStatus());
  http: HttpClient;

  constructor(private router: Router, http: HttpClient, private cookieService: CookieService) {
    this.http = http;
  }

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
      //If login was successful store the user's info in session storage
      user = response;
      sessionStorage.setItem('userId', response.body.userId.toString());
      sessionStorage.setItem('username', response.body.username);
      this.router.navigateByUrl('/home');
      sessionStorage.setItem('loggedIn', '1');
      this.loggedIn.next(true);
    }, (error: HttpErrorResponse) => {
      document.getElementById('invalid')!.style.display = "flex";
      //console.log(error);
    });


  }

  public logout() {
    this.loggedIn.next(false);
    sessionStorage.clear();
    this.router.navigateByUrl('/login');
    this.cookieService.deleteAll();
  }
}
