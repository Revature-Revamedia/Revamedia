import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimationService } from 'src/app/Shared/services/animation/animation.service';
import { GroupService } from 'src/app/Shared/services/group-service/group.service';
import { UserService } from 'src/app/Shared/services/user-service/user.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  constructor(
    public userService: UserService,
    public groupsService: GroupService,
    private router: Router,
    public animationService: AnimationService)
  { }

  ngOnInit(): void {
    // this.getCurrentUserData();
    // this.getAllGroups();
    // this.openingAnimation();
  }

  public currentUser: any = {};
  public groups: any[] = [];
  public getCurrentUserData(){
    this.userService.getUser().subscribe(
      (response: any) => {
        this.currentUser = response;
        this.groups = response?.groupsOwned;
        this.groups = this.groups.concat(response?.groupsJoined);
        this.groups = this.groups.flat();
      },
      (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    );
  }

  public allGroups: any[] = [];
  public getAllGroups(){
    this.groupsService.getAllGroups().subscribe(
      (response: any) => {
        this.allGroups = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    )
  }

  // ADD NEW GROUP
  public onAddGroup(form: NgForm){
    this.groupsService.newGroup(form.value).subscribe(
      (response: any) => {
        this.closeModal('new-group');
        this.getCurrentUserData();
      },
      (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    )
  }

  public onDeleteGroup(id: number){
    this.groupsService.deleteGroup(id).subscribe(
      (response: any) => {

        this.closeModal('delete-group');
        this.getCurrentUserData();
      },
      (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    )
  }

  public openModal(modalType: string, object: any) {
    // Screen
    const screen = document.getElementById('screen');
    screen?.classList.add('openScreen');
    // Form
    const form = document.getElementById(`${modalType}-modal`);
    form?.classList.add('openModal');
  }

  public closeModal(modalType: string) {
    // Screen
    const screen = document.getElementById('screen');
    screen?.classList.remove('openScreen');
    // Form
    const form = document.getElementById(`${modalType}-modal`);
    form?.classList.remove('openModal');
  }

  public goToGroup(groupId: any){
    this.router.navigate([`group/${groupId}`]);
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
    const form1 = document.getElementById(`new-group-modal`);
    form1?.classList.remove('openModal');
  }
}
