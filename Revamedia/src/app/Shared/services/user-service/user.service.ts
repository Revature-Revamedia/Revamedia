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
      console.log(data.body);
      num = data.body.userPosts.likes.length;
      this.setCurrentUser(data.body.user);
    });
    return num
  }



  //this.followers = new HashSet<>();
  //      this.following = new HashSet<>();
  //      this.postsOwned = new HashSet<>();

  //      this.groupsJoined = new HashSet<>();
  //      this.groupsOwned = new HashSet<>();

  //      this.eventsJoined = new HashSet<>();
  //      this.eventsOwned = new HashSet<>();

  // this.conversations = new HashSet<>();

  //     this.likedPosts = new ArrayList<>();
  //1. when user logs in-
  //2.you store their user id in local storage.
  //3. call method to get user information.
  //4. set user information into user

  //user: any = user.getid(localsessionid);

  //allUserPosts
  //userTimeline
  //likeapost()
  //{
  //    userTimeline.behavior.next(post.info)
  // }
  //


  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${this.userURL}/allUsers`, { observe: `response` })
  }

  getUserById(id: any): Observable<any> {
    console.log("test");
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
    console.log('information from form', Follow);
    return this.http.post<any>(`${this.userURL}/userFollows`, Follow);
  }
  public unfollowUser(unfollow: any) : Observable<any> {
    console.log('information from form', unfollow);
    console.log(`${this.userURL}/deleteFollowing`);
    return this.http.post<any>(`${this.userURL}/deleteFollowing`, unfollow);
  }

}
