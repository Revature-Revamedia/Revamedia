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
  QRCodeUrl = `${environment.apiBaseUrl}/auth/enable`;
  getQRCodeImage() : Observable<any>{
    let authDto = {
      userId: 1,
      twoFactorAuth: true
    }
    return this.http.post<any>(this.QRCodeUrl,authDto, {headers: new HttpHeaders({'Content-Type':"application/json"})});
  
}}
