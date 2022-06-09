import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  searchUrl = environment.apiBaseUrl + "/search/user";

  searchUser(searchKey: string){

    this.http.post<any>(this.searchUrl,searchKey).subscribe((data: any) => {console.log(data)});

  }

}
