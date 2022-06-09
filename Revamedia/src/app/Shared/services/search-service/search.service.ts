import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  searchUrl = environment.apiBaseUrl + "/search/user";

  searchUser(searchKey: string): Observable<any>{

    return this.http.post<any>(this.searchUrl,searchKey);

  }

}
