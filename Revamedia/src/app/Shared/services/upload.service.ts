import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UploadService {

  SERVER_URL: string = environment.apiBaseUrl + "/s3/upload";
	constructor(private httpClient: HttpClient) { }

  public upload(formData: any ) {

    return this.httpClient.post<any>(this.SERVER_URL, formData, {
        reportProgress: true,
        observe: 'events',

      });
  }


  public delete(fineName: string ) {
    return this.httpClient.delete<any>(`${environment.apiBaseUrl}/s3/${fineName}`);
  }
}
