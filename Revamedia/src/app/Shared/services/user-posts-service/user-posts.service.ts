import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserPostsService {
  userPostURL: string = environment.apiBaseUrl + "/posts"

  constructor(private http: HttpClient) { }

  //update post function sends put requests and updates

  public getPostById(id: Number): Observable<any> {
    return this.http.get<any>(`${this.userPostURL}/${id}`)
  }

  public addPost(post: any): Observable<any> {
    return this.http.post<any>(`${this.userPostURL}/addPost`, post);
  }

  public updatePost(post: any): Observable<any> {
    return this.http.put<any>(`${this.userPostURL}/updatePost`, post);
  }

  public deletePost(id: number): Observable<any> {
    return this.http.delete<any>(`${this.userPostURL}/delete/${id}`);
  }

  //array of posts
  //behavior value of inital value of array of posts

  // update post function sends put requests and updates
  updatePostLikes(updatePostLikesDto: any): Observable<any> {
    return this.http.put<any>(`${this.userPostURL}/likes`, updatePostLikesDto, { observe: `response` })
  }

}
