import { UserPostsService } from './../../Shared/services/user-posts-service/user-posts.service';
import { NgForm } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Output } from '@angular/core';

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.scss']
})
export class PostAddComponent implements OnInit {
  @Input() user:any;
  @Output() closeNewPostForm = new EventEmitter();

  constructor(private userPostsService:UserPostsService) { }

  ngOnInit(): void {
  }


  onAddPost(postForm: NgForm): void {
    this.userPostsService.addPost(postForm.value).subscribe(

      (response: any) => {
        this.closeNewPostForm.emit();
      },
      (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    );

  }

  closeForm() { // You can give any function name
    this.closeNewPostForm.emit();
}



}
