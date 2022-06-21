import { UserPostsService } from './../../Shared/services/user-posts-service/user-posts.service';
import { NgForm } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.scss']
})
export class PostAddComponent implements OnInit {
  @Input() user:any;

  constructor(private userPostsService:UserPostsService) { }

  ngOnInit(): void {
  }


  public closeModal(modalType: string, post: any  ) {
    // Screen
    const screen = document.getElementById('screen');
    screen?.classList.remove('openScreen');
    // Form
    const form = document.getElementById(`${modalType}-${post}`);
    form?.classList.remove('openModal');
  }


  onAddPost(postForm: NgForm): void {
    console.log("fati")
    console.log(postForm.value);
    this.userPostsService.addPost(postForm.value).subscribe(

      (response: any) => {
        this.closeModal('add', 'post-modal');
      },
      (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    );

  }


}
