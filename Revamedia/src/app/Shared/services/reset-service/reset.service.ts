import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { IAuthDto } from '../../interfaces/IAuthDto.interface';

@Injectable({
  providedIn: 'root'
})
export class ResetService {

  constructor(private http: HttpClient) { }

  public authDto : IAuthDto = {
    username: "",
    password: ""
  }

  resetUrl: string = environment.apiBaseUrl + "/forgot/reset";
  resetPassword(resetForm: NgForm){
    this.authDto.username = resetForm.value.username;
    this.authDto.password = resetForm.value.password;


    this.http.post<any>(this.resetUrl, this.authDto,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      'withCredentials': true
    }).subscribe((response: any) => {console.log(response)});
  }
}

