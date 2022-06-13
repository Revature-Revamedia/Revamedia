import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class GroupService {

  public baseUrl = `${environment.apiBaseUrl}/groups`;

  constructor(private http : HttpClient) { }

  public getAllGroups(): Observable<any>{
    return this.http.get<any[]>(`${this.baseUrl}/allGroups`);
  }
  public newGroup(groupForm: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/newGroup`, groupForm);
  }
  public deleteGroup(id: number): Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/delete/${id}`);
  }
  public getGroupById(id: number): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }
}
