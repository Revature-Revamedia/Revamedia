import { faHeart, faBookmark, faComment, faShareFromSquare, faFaceGrinStars, faFaceGrinTongueSquint, faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { UserPostsService } from './../../Shared/services/user-posts-service/user-posts.service';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CommentService } from '../../Shared/services/user-comments-service/comment.service';
import { GiphyService } from '../../Shared/services/giphy-service/giphy.service';
import { AnimationService } from 'src/app/Shared/services/animation/animation.service';

import { UserService } from '../../Shared/services/user-service/user.service';

@Component({
  selector: 'app-post',
  templateUrl:'./post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
    // Front End Work
    public faHeart = faHeart; //icon
    public faBookmark = faBookmark; //icon
    public faComment = faComment; //icon
    public faShareFromSquare = faShareFromSquare; //icon
    public faFaceGrinStars = faFaceGrinStars; //icon
    public faFaceGrinTongueSquint = faFaceGrinTongueSquint; //icon
    public faTrashCan = faTrashCan; //icon
    public faPenToSquare = faPenToSquare; //icon


    public editComment: any;
    public deleteComment: any;
    public editReply: any;
    public deleteReply: any;
    public editPost: any;
    public deletePost: any;
    public editYoutube: any;
    public deleteYoutube: any;

    public viewCommentsIsOn=false;
    public addComment=true;

    @Input() post:any;
    @Input() user:any;

    constructor(
      public CommentService: CommentService,
      private userPostsService: UserPostsService,
      public userService: UserService,
      public gifService: GiphyService,
      public animationService: AnimationService,
      public router: Router
      )
    { }


    ngOnInit(): void {
      //this.getGifs('funny');
      //this.openingAnimation();
    }

      // ANIMATION
  // public openingAnimation() {
  //   const anim = this.animationService;
  //   const main = '#main';
  //   anim.fadeIn(main, 0.7, 0, 1);
  // }

    // gifs
    // public gifs: any[] = [];
    // public getGifs(search: string): void {
    //   this.gifService.getGIFS(search).subscribe(
    //     (response: any) => {
    //       this.gifs = response.data;
    //     },
    //     (error: HttpErrorResponse) => {
    //       console.log(error.message)
    //     }
    //   )
    // }

    public openModal(modalType: string, id: string, object: any) {
         console.log("id",id)
         console.log("modalType",modalType)

      // Screen
      const screen = document.getElementById('screen');
      screen?.classList.add('openScreen');
      // Form
      const form = document.getElementById(`${modalType}-${id}`);

      form?.classList.add('openModal');
      if (modalType === "edit") {
        this.commentOptionsClicked = false;
        this.editComment = object;
        this.editReply = object;
        this.editPost = object;
        this.editYoutube = object;
      }
      if (modalType === "delete") {
        this.commentOptionsClicked = false;
        this.deleteComment = object;
        this.deleteReply = object;
        this.deletePost = object;
        this.deleteYoutube = object;
      }
    }


  onUpdatePost(postForm: NgForm): void {
    this.userPostsService.updatePost(postForm.value).subscribe(
      (response: any) => {
        this.closeModal('edit', 'post-modal');
        //this.getCurrentUserData();

      },
      (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    )
  }

  onDeletePost(id: number) {
    this.userPostsService.deletePost(id).subscribe(
      (response: any) => {
        this.closeModal('delete', 'post-modal');
        //this.getCurrentUserData();
      },
      (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    )
  }



  public commentOptionsClicked = false;
  public toggleCommentsOptions() {
    this.commentOptionsClicked = !this.commentOptionsClicked;
  }

  public goToProfile(userId: any){
    this.router.navigate([`profile/${userId}`]);
  }



  likePost(currentPost: any): void {
    let p = {
      userId: 0,
      postId: 0,
    }
    p.postId = currentPost.postId;
    p.userId = this.user.userId;

    this.userService.userLikesPost(p);
    // this.getCurrentUserData();
  }


  public toggleComments(){
    this.viewCommentsIsOn = ! this.viewCommentsIsOn
  }


  public closeModal(modalType: string, post: any) {
    // Screen
    const screen = document.getElementById('screen');
    screen?.classList.remove('openScreen');
    // Form
    const form = document.getElementById(`${modalType}-${post}`);
    form?.classList.remove('openModal');
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
