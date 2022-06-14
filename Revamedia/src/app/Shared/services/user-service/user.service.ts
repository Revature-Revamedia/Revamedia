import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
      this.user = response.body;
      this.setCurrentUser(this.user);
    });
  }

  getCurrentUser(): BehaviorSubject<any> {
    return this.userSubject;
  }

  setCurrentUser(user: any) {
    this.userSubject.next(user);
  }

  userLikesPost(currentPost: any) {
    this.userPostsService.updatePostLikes(currentPost).subscribe((data) => {
      this.setCurrentUser(data.body.user);
    });
  }

  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${this.userURL}/allUsers`, { observe: `response` })
  }

  getUserById(id: any): Observable<any> {
    return this.http.get<any>(`${this.userURL}/` + id, { observe: `response` })
  }

  public getUser() : Observable<any> {
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

    return this.http.post<any>(`${this.userURL}/userFollows`, Follow);
  }
  public unfollowUser(unfollow: any) : Observable<any> {
    return this.http.post<any>(`${this.userURL}/deleteFollowing`, unfollow);
  }

  public isFollowing(profileId: any): Observable<any>{
    return this.http.get<any>(`${this.userURL}/isFollowing/${sessionStorage.getItem('userId')}/${profileId}`);
  }

}
