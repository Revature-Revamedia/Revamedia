import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QrcodeService {

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  public image: any = ""
  QRCodeUrl = `${environment.apiBaseUrl}/auth`;

  enableTwoFactorAuth() : Observable<any>{
    let authDto = {
      mode : "enable",
      twoFactorAuth: true
    }
    return this.http.post<any>(this.QRCodeUrl+"/enable",authDto, {headers: new HttpHeaders({'Content-Type':"application/json"}),'withCredentials': true } );

  }

  disableTwoFactorAuth() : Observable<any>{
    let authDto = {
      mode : "disable",
      twoFactorAuth: false
    }
    return this.http.post<any>(this.QRCodeUrl+"/disable", authDto, {headers: new HttpHeaders({'Content-Type':"application/json"}),'withCredentials': true});
  }

  recreateQRCode(): Observable<any> {
    let authDto = {
      mode : "recreate",
      twoFactorAuth: true
    }
    return this.http.post<any>(this.QRCodeUrl+"/recreate", authDto, {headers: new HttpHeaders({'Content-Type':"application/json"}), 'withCredentials': true});
  }

}
