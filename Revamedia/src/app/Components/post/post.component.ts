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
    //public deletePost: any;
    public editYoutube: any;
    public deleteYoutube: any;

    public viewCommentsIsOn=false;
    public addComment=true;

    public deleteModalIsOn=false;
    public editModalIsOn=false;
    public activePost: any;
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

    public openDeletePostModal(object: any) {
        this.editModalIsOn=false;
        this.activePost=object;
        this.deleteModalIsOn = true;
    }

    public openEditPostModal(object: any) {
      this.deleteModalIsOn = false;
      this.activePost=object;
      this.editModalIsOn = true;

 }

  public goToProfile(userId: any){
    this.router.navigate([`profile/${userId}`]);
  }


  closeDeleteForm(){
    this.deleteModalIsOn=false;
    this.editModalIsOn=false;
    this.activePost="";
  }


}
