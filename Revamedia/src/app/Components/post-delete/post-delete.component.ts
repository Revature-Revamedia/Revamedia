import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserPostsService } from 'src/app/Shared/services/user-posts-service/user-posts.service';

@Component({
  selector: 'app-post-delete',
  templateUrl: './post-delete.component.html',
  styleUrls: ['./post-delete.component.scss']
})
export class PostDeleteComponent implements OnInit {
  @Input() post: any;
  @Output() closeDeleteForm = new EventEmitter();

  constructor(private userPostsService: UserPostsService,) { }

  ngOnInit(): void {
  }

  public closeModal(modalType: string, post: any) {
    // Screen
    const screen = document.getElementById('screen');
    screen?.classList.remove('openScreen');
    // Form
    const form = document.getElementById(`${modalType}-${post}`);
    form?.classList.remove('openModal');

  }

  onDeletePost() {
    console.log(this.post.postId);
    this.userPostsService.deletePost(this.post.postId).subscribe(
      (response: any) => {
        this.closeModal('delete', 'post-modal');
      },
      (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    )
  }

  closeForm() { // You can give any function name
    this.closeDeleteForm.emit();
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
