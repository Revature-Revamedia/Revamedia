/**
 * @Author: Giorgi Amirajibi, ...
 * @Contributor: Jarod Heng
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, throwError, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  registerUrl: string = environment.apiBaseUrl + "/auth/register";

  constructor(private http : HttpClient) { }
  createUser(body: object, options: object): Observable<any> {
    // console.log("Post: ", this.registerUrl, body, options)
    return this.http.post<any>(this.registerUrl ,  JSON.stringify(body), options)
      .pipe(
        retry(3),
        catchError(this.errorHandler)
      )
  }

  errorHandler(error: any): any {
    let errorMessage : any = {};

    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;

    } else {
      // Get server-side error
      if(errorMessage.errorStatus = 409){
        alert("Username and or email is not unique")
      };
      errorMessage.errorStatus = error.error.errorStatus
      errorMessage.errorFirstName = error.error.firstName;
      errorMessage.errorLastName = error.error.lastName;
      errorMessage.errorEmail = error.error.email;
      errorMessage.errorUsername = error.error.username;
      errorMessage.errorPassword = error.error.password;

    }
    //return errorMessage;
    return throwError(() => errorMessage);
  }


}


