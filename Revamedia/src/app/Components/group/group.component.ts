import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from 'src/app/Shared/services/group-service/group.service';
import { faHeart, faEllipsis, faBookmark, faComment, faShareFromSquare, faFaceGrinStars, faFaceGrinTongueSquint, faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/Shared/services/user-service/user.service';
import { AnimationService } from 'src/app/Shared/services/animation/animation.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  constructor(
    public groupService: GroupService,
    private ARouter: ActivatedRoute,
    private router: Router,
    public userService: UserService,
    public animationService: AnimationService)
  { }

  ngOnInit():void {
    // this.getGroupData();
    // this.getCurrentUserData();
    // this.openingAnimation();
  }

  public group: any = {};
  public groupPosts: any[] = [];
  // GET CURRENT USER
  public getGroupData(){
    let id: any = this.ARouter.snapshot.paramMap.get('id');
    this.groupService.getGroupById(id).subscribe(
      (response: any) => {
        this.group = response;
        this.groupPosts = response?.posts;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    );
  }
  public currentUser: any = {};
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

  public onDeleteGroup(id: number){
    this.groupService.deleteGroup(id).subscribe(
      (response: any) => {
        this.getGroupData();
        this.getCurrentUserData();
        this.closeModal('delete-group');
      },
      (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    )
  }

  public onUpdateGroup(form: NgForm){
    this.groupService.updateGroup(form.value).subscribe(
      (response: any) => {
        this.getGroupData();
        this.getCurrentUserData();
        this.closeModal('edit-group');
      },
      (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    )
  }

  public goToProfile(userId: any){
    this.router.navigate([`profile/${userId}`]);
  }

  //Icons
  public faPenToSquare = faPenToSquare;
  public faTrashCan = faTrashCan;

  public editGroup: any = {};
  public deleteGroup: any = {};
  public openModal(modalType: string, object: any) {
    // Screen
    const screen = document.getElementById('screen');
    screen?.classList.add('openScreen');
    // Form
    const form = document.getElementById(`${modalType}-modal`);
    form?.classList.add('openModal');
    if(modalType == 'edit-group'){
      this.editGroup = object;
    }
    if(modalType == 'delete-group'){
      this.deleteGroup = object;
    }
  }

  public closeModal(modalType: string) {
    // Screen
    const screen = document.getElementById('screen');
    screen?.classList.remove('openScreen');
    // Form
    const form = document.getElementById(`${modalType}-modal`);
    form?.classList.remove('openModal');
  }

  // ANIMATION
  public openingAnimation() {
    const anim = this.animationService;
    const main = '#main';
    anim.fadeIn(main, 0.7, 0, 0.6);
  }
  public closeAnyModal(){
    // Screen
    const screen = document.getElementById('screen');
    screen?.classList.remove('openScreen');
    // Form
    const form1 = document.getElementById(`edit-group-modal`);
    form1?.classList.remove('openModal');
    const form2 = document.getElementById(`delete-group-modal`);
    form2?.classList.remove('openModal');
  }
}
