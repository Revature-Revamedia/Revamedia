import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from 'src/app/Shared/services/group-service/group.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  constructor(public groupService: GroupService,private ARouter: ActivatedRoute, private router: Router,) { }

  ngOnInit():void {
    this.getGroupData();
  }

  public group: any = {};
  // GET CURRENT USER
  public getGroupData(){
    let id: any = this.ARouter.snapshot.paramMap.get('id');
    this.groupService.getGroupById(id).subscribe(
      (response: any) => {
        this.group = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    );
  }

}
