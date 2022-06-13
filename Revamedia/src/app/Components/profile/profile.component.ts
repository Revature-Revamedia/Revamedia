import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimationService } from 'src/app/Shared/services/animation/animation.service';
import { UserService } from 'src/app/Shared/services/user-service/user.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private ARouter: ActivatedRoute, private router: Router, private userService: UserService, public animationService: AnimationService) { }

  ngOnInit(): void {
    this.getUserData(); // Gets profile
    this.getCurrentUserData(); // Gets current user
    this.openingAnimation();
    this.isFollowing();
  }
  public followingLength: any;
  public followerLength: any;
  // User data
  public user: any;
  // Posts
  public posts: any[] = [];
  // GET CURRENT USER
  public getUserData(){
    let id: any = this.ARouter.snapshot.paramMap.get('id');
    this.userService.getProfile(id).subscribe(
      (response: any) => {
        this.user = response;
        this.posts = response?.postsOwned;
        this.posts = this.posts.flat();
        this.posts.sort((a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime());
        console.log(this.user.userId);
        this.followerLength = response.followers.length;
        this.followingLength = response.following.length;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    );
  }
  public currentUser: any;
  public getCurrentUserData(){
    this.userService.getUser().subscribe(
      (response: any) => {
        this.currentUser = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    );
  }

  // FRONT END WORK
  public openModal(modalType: string, data: any) {
    // Screen
    const screen = document.getElementById('screen');
    screen?.classList.add('openScreen');
    // Modal
    const modal = document.getElementById(`${modalType}-modal`);
    modal?.classList.add('openModal');
  }

  public closeModal(modalType: string) {
    // Screen
    const screen = document.getElementById('screen');
    screen?.classList.remove('openScreen');
    // Modal
    const modal = document.getElementById(`${modalType}-modal`);
    modal?.classList.remove('openModal');
  }

  // ANIMATION
  public openingAnimation() {
    const anim = this.animationService;
    const main = '#profile';
    anim.fadeIn(main, 0.7, 0, 0.6);
  }

  public followUser(follow: NgForm){
    this.userService.followUser(follow.value).subscribe(
      (response: any) => {
        console.log(response);
        this.followerLength = response.followers.length;
        this.getUserData();
        this.isFollowing();
      },
      (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    )
  }
  public unfollowUser(unfollow: NgForm){
    console.log(unfollow.value)
    this.userService.unfollowUser(unfollow.value).subscribe(
      (response: any) => {
        console.log(response);
        this.followerLength = response.followers.length;
        this.getUserData();
        this.isFollowing();
      },
      (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    )
  }

  public goToProfile(userId: any){
    window.location.href = `profile/${userId}`;
  }

  public closeAnyModal(){
    // Screen
    const screen = document.getElementById('screen');
    screen?.classList.remove('openScreen');
    // Form
    const form1 = document.getElementById(`following-modal`);
    form1?.classList.remove('openModal');
    const form2 = document.getElementById(`followers-modal`);
    form2?.classList.remove('openModal');
  }

  public follow: any;
  public isFollowing(){
    let id: any = this.ARouter.snapshot.paramMap.get('id');
    this.userService.isFollowing(id).subscribe(
      (response: any) => {
        console.log(response);
        this.follow = response.data;
        console.log(this.follow);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    )
  }
}
