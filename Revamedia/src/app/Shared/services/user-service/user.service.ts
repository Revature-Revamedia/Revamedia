import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { data } from 'jquery';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserPostsService } from '../user-posts-service/user-posts.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: any;
  private userSubject: BehaviorSubject<any>;
  userURL: string = environment.apiBaseUrl + "/user"

  private baseUrl = `${environment.apiBaseUrl}`;

  constructor(private http: HttpClient, private userPostsService: UserPostsService) {
    this.userSubject = new BehaviorSubject<any>(this.user);
    this.getUserById(sessionStorage.getItem('userId')).subscribe((response: any) => {
      console.log("1: ", response.body);
      this.user = response.body;
      console.log("userservice: ", this.user);
      this.setCurrentUser(this.user);
    });

    //sessionStorage.getItem('userid')
  }

  getCurrentUser(): BehaviorSubject<any> {
    return this.userSubject;
  }

  setCurrentUser(user: any) {
    this.userSubject.next(user);
  }

  userLikesPost(currentPost: any): number {
    let num: number = 0;
    this.userPostsService.updatePostLikes(currentPost).subscribe((data) => {
      console.log('likes', data.body.likes);
      num = data.body.likes.length;
      this.setCurrentUser(data.body.user);
    });
    return num
  }


  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${this.userURL}/allUsers`, { observe: `response` })
  }

  getUserById(id: any): Observable<any> {
    console.log("test");
    return this.http.get<any>(`${this.userURL}/` + id, { observe: `response` })
  }

  public getUser() : Observable<any> {
    this.http.get<any>(`${this.userURL}/${sessionStorage.getItem('userId')}`).subscribe((data)=>{
      console.log('logged in user', data);
    });
    return this.http.get<any>(`${this.userURL}/${sessionStorage.getItem('userId')}`);
  }

  public getProfile(id: number) : Observable<any> {
    return this.http.get<any>(`${this.userURL}/${id}`);
  }


  public updateUser(user: any, id: number): Observable<any> {
    return this.http.put<any>(`${this.userURL}/update/${id}`, user);
  }

  // FOLLOW
  public followUser(Follow: any) : Observable<any> {
    console.log('information from form', Follow);
    return this.http.post<any>(`${this.userURL}/userFollows`, Follow);
  }
  public unfollowUser(unfollow: any) : Observable<any> {
    console.log('information from form', unfollow);
    console.log(`${this.userURL}/deleteFollowing`);
    return this.http.post<any>(`${this.userURL}/deleteFollowing`, unfollow);
  }


}
