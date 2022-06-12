import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  // API Base Url
  private apiBaseUrl = `${environment.apiBaseUrl}`;

  constructor(private httpClient: HttpClient) { }

  public addComment(comment: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiBaseUrl}/comment/add`, comment, {'withCredentials': true, 'observe': `response`});
  }

  public getCommentById(commentId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.apiBaseUrl}/comment/${commentId}`);
  }

  public getAllComments(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.apiBaseUrl}/comment/all`);
  }

  public updateComment(comment: any): Observable<any> {
    return this.httpClient.put<any>(`${this.apiBaseUrl}/comment/update`, comment, {'withCredentials': true, 'observe': `response`});
  }

  public deleteComment(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiBaseUrl}/comment/delete/${id}`, {'withCredentials': true, 'observe': `response`});
  }

  public addReply(reply: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiBaseUrl}/reply/add`, reply);
  }

  public updateReply(message: any, id: number): Observable<any> {
    return this.httpClient.put<any>(`${this.apiBaseUrl}/reply/update/${id}`, message);
  }

  public deleteReply(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiBaseUrl}/reply/delete/${id}`);
  }

}
