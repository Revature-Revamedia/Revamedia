import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimationService } from 'src/app/Shared/services/animation/animation.service';
import { GiphyService } from 'src/app/Shared/services/giphy-service/giphy.service';
import { UserPostsService } from 'src/app/Shared/services/user-posts-service/user-posts.service';
import { UserService } from 'src/app/Shared/services/user-service/user.service';
import { CommentService } from '../../Shared/services/user-comments-service/comment.service';

@Component({
  selector: 'app-post-comment-reply',
  templateUrl: './post-comment-reply.component.html',
  styleUrls: ['./post-comment-reply.component.scss']
})
export class PostCommentReplyComponent implements OnInit {
  public user: any;
  users: any[] = [];
  posts: any[] = [];
  public post: any;
  public comment: any;
  @Input() editReply: any;
  @Input() deleteReply:any;

  constructor(
    public CommentService: CommentService,
    private userPostsService: UserPostsService,
    public userService: UserService,
    public gifService: GiphyService,
    public animationService: AnimationService,
    public router: Router
    )
  { }

    // GET CURRENT USER
    public getCurrentUserData(){
      this.userService.getUser().subscribe(
        (response: any) => {
          this.user = response;
          let userPosts = [];
          this.posts = response?.postsOwned;
          let followingPost = [];
          for(let f of response?.following) {
            followingPost = f?.followedId?.postsOwned;
          }
          this.posts = this.posts.concat(followingPost);
          this.posts = this.posts.flat();
          this.posts.sort((a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime());      },
        (error: HttpErrorResponse) => {
          console.log(error.message)
        }
      );
    }

  ngOnInit(): void {
    this.getGifs('funny');
    this.getCurrentUserData();
    this.openingAnimation();
  }


  // EDIT REPLY START
  public onEditReply(replyForm: NgForm): void {
    let message = replyForm.value.message;
    let replyId = replyForm.value.reply_id;
    this.CommentService.updateReply(message, replyId).subscribe(
      (response: any) => {

        this.getCurrentUserData();
        this.closeModal('edit', 'reply-modal');
        this.selectedGiphy = "";
      },
      (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    )
  }
  // EDIT REPLY END

  // DELETE REPLY
  public onDeleteReply(id: number) {
    this.CommentService.deleteReply(id).subscribe(
      (response: any) => {
        this.getCurrentUserData();
        this.closeModal('delete', 'reply-modal');
        this.selectedGiphy = "";
      },
      (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    )
  }
  // DELETE REPLY END

  public closeModal(modalType: string, post: any) {
    // Screen
    const screen = document.getElementById('screen');
    screen?.classList.remove('openScreen');
    // Form
    const form = document.getElementById(`${modalType}-${post}`);
    form?.classList.remove('openModal');
  }
  // gifs
  public gifs: any[] = [];
  public getGifs(search: string): void {
    this.gifService.getGIFS(search).subscribe(
      (response: any) => {
        this.gifs = response.data;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    )
  }
  // ANIMATION
  public openingAnimation() {
    const anim = this.animationService;
    const main = '#main';
    anim.fadeIn(main, 0.7, 0, 1);
  }

  public selectedGiphy = "";
  public selectGiphy(url: any) {
    this.selectedGiphy = url;
  }



}
