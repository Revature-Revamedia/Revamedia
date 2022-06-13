import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';



@Injectable({
  providedIn: 'root'
})
export class ProfilePicService {

  //form: FormGroup;
  uploadProfilePicUrl: string = environment.apiBaseUrl + "/profilepic/upload";

  constructor(private http: HttpClient) {
    /*
      this.form = this.formBuilder.group({
        img: ['']
      })
      */

  }

  /*
  selectImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.patchValue({
        img: ['']
      });
      this.form.get('img').setValue(file);

    }
  }
*/

  uploadProfilePic(formData: FormData): Observable<any> {
    // console.log("Post: ", this.registerUrl, body, options)
    //var formData: any = new FormData();
    //formData.append('img', this.form.get('img').value);

    return this.http.post<any>(this.uploadProfilePicUrl, "images=@" + formData)
      .pipe(
        retry(3),
        catchError(this.errorHandler)
      )
  }
  errorHandler(error: any): any {
    let errorMessage: any = {};

    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;

    } else {
      // Get server-side error
      errorMessage.errorStatus = error.error.errorStatus
    }
  }

}
