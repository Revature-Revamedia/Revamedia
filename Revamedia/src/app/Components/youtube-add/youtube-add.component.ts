import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserPostsService } from '../../Shared/services/user-posts-service/user-posts.service';

@Component({
  selector: 'app-youtube-add',
  templateUrl: './youtube-add.component.html',
  styleUrls: ['./youtube-add.component.scss']
})
export class YoutubeAddComponent implements OnInit {
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

// Youtube section
public shareVideo(form: NgForm){
  var youtubeDto = {
    userId: form.value.userId,
    youtubeLink: form.value.youtubeLink,
    message: form.value.message
  }
  this.userPostsService.addYoutube(youtubeDto).subscribe(
    (response: any) => {
      this.closeNewPostForm.emit();
      //this.getCurrentUserData();
      // this.getAllPost();
      //this.closeModal('add', 'youtube-modal');
    },
    (error: HttpErrorResponse) => {
      console.log(error.message)
    }
  );
}

public editVideo(form: NgForm){
  var editYoutubeDto = {
    postId: form.value.postId,
    youtubeLink: form.value.youtubeLink,
    message: form.value.message
  }
  this.userPostsService.editYoutube(editYoutubeDto).subscribe(
    (response: any) => {
      this.closeNewPostForm.emit();

      //this.getCurrentUserData();
      // this.getAllPost();
      //this.closeModal('edit', 'youtube-modal');
    },
    (error: HttpErrorResponse) => {
      console.log(error.message)
    }
  )

}
public deleteVideo(id: number){
  this.userPostsService.deleteYoutube(id).subscribe(
    (response: any) => {
      this.closeNewPostForm.emit();
      //this.getCurrentUserData();
      // this.getAllPost();
      //this.closeModal('delete', 'youtube-modal');
    },
    (error: HttpErrorResponse) => {
      console.log(error.message)
    }
  )
}

public closeAnyModal(){
  // Screen
  const screen = document.getElementById('screen');
  screen?.classList.remove('openScreen');
  // Form
  const form1 = document.getElementById(`add-post-modal`);
  form1?.classList.remove('openModal');
  const form2 = document.getElementById(`edit-post-modal`);
  form2?.classList.remove('openModal');
  const form3 = document.getElementById(`delete-post-modal`);
  form3?.classList.remove('openModal');
  const form4 = document.getElementById(`add-comment-modal`);
  form4?.classList.remove('openModal');
  const form5 = document.getElementById(`edit-comment-modal`);
  form5?.classList.remove('openModal');
  const form6 = document.getElementById(`delete-comment-modal`);
  form6?.classList.remove('openModal');
  const form7 = document.getElementById(`add-reply-modal`);
  form7?.classList.remove('openModal');
  const form8 = document.getElementById(`edit-reply-modal`);
  form8?.classList.remove('openModal');
  const form9 = document.getElementById(`delete-reply-modal`);
  form9?.classList.remove('openModal');
  const form10 = document.getElementById(`add-youtube-modal`);
  form10?.classList.remove('openModal');
  const form11 = document.getElementById(`edit-youtube-modal`);
  form11?.classList.remove('openModal');
  const form12 = document.getElementById(`delete-youtube-modal`);
  form12?.classList.remove('openModal');
}
}


