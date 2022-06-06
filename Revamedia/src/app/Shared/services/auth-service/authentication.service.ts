import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public loggedIn = new BehaviorSubject<boolean>(this.checkLoginStatus());

  constructor(private router: Router, private http: HttpClient, private cookieService: CookieService) { }

  checkLoginStatus(): boolean {
    var loginCookie = sessionStorage.getItem('LoggedIn');
    if (loginCookie == "1") {
      return true;
    } else {
      return false;
    }
  }
  public login(loginForm: NgForm) {

    let user = {
      username: loginForm.value.username,
      password: loginForm.value.password
    }
    //Post request to attempt to login the user
    this.http.post('http://localhost:8080/auth/login', user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      'withCredentials': true, 'observe': `response`
    }).subscribe((response: any) => {
      console.log(response);
      sessionStorage.setItem('userId', response.body.userId.toString());
      sessionStorage.setItem('username', response.body.username);
      console.log(sessionStorage.getItem('username'));

      this.loggedIn.next(true);
      this.router.navigateByUrl('/home');
    }, (error: HttpErrorResponse) => {
      document.getElementById('invalid')!.style.display = "flex";
      console.log(error);
    })

  }

  public logout() {
    this.loggedIn.next(false);
    this.router.navigateByUrl('/login');
    this.cookieService.deleteAll();
    sessionStorage.removeItem('LoggedIn');
  }
}
