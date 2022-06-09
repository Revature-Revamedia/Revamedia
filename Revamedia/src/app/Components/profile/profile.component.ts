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

  public id: any = this.ARouter.snapshot.paramMap.get('id');
  ngOnInit(): void {
    this.getUserData(); // Gets profile
    this.getCurrentUserData(); // Gets current user
    this.openingAnimation();
  }

  // User data
  public user: any;
  // Posts
  public posts: any[] = [];
  // GET CURRENT USER
  public getUserData(){
    this.userService.getProfile(this.id).subscribe(
      (response: any) => {
        this.user = response;
        console.log(this.user);
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
        console.log(this.currentUser);
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
      },
      (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    )
  }

  public goToProfile(userId: any){
    this.router.navigate([`profile/${userId}`]);
  }
}
