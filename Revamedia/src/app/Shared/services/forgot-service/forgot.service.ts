import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForgotService {

  constructor(private http: HttpClient) { }

  sendEmailUrl = environment.apiBaseUrl + "/forgot/email";
  sendEmail(sendEmailForm: NgForm){
    let email = sendEmailForm.value.email;

    this.http.post<any>(this.sendEmailUrl,email,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })}).subscribe((data: any) => {
        
      })
  }
}
