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
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.scss']
})
export class PostCommentComponent implements OnInit {
  public user: any;
  users: any[] = [];
  posts: any[] = [];
  public post: any;
  public comment: any;
  public editReply: any;
  public deleteReply: any;
  public editPost: any;
  public deletePost: any;
  public editYoutube: any;
  public deleteYoutube: any;

  @Input() editComment: any;
  @Input() deleteComment:any;
  @Input() addComment: any;
  @Input() p:any;

  public selectedGiphy = "";
  public selectGiphy(url: any) {
    this.selectedGiphy = url;
  }

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
  }

  public commentOptionsClicked = false;
  public toggleCommentsOptions() {
    this.commentOptionsClicked = !this.commentOptionsClicked;
  }

  public closeModal(modalType: string, post: any) {
    // Screen
    const screen = document.getElementById('screen');
    screen?.classList.remove('openScreen');
    // Form
    const form = document.getElementById(`${modalType}-${post}`);
    form?.classList.remove('openModal');
  }

    // DELETE REPLY
    public onDeleteComment(id: number) {
      this.CommentService.deleteComment(id).subscribe(
        (response: any) => {
          this.getCurrentUserData();
          this.closeModal('delete', 'comment-modal');
          this.selectedGiphy = "";
          // this.userService.setCurrentUser(response.body.data);
        },
        (error: HttpErrorResponse) => {
          console.log(error.message)
        }
      )
    }
    // DELETE REPLY END

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
    public onEditComment(commentForm: NgForm): void {

      this.CommentService.updateComment(commentForm.value).subscribe(
        (response: any) => {
          this.getCurrentUserData();
          this.closeModal('edit', 'comment-modal');
          this.selectedGiphy = "";
          // this.userService.setCurrentUser(response.body.data);
        },
        (error: HttpErrorResponse) => {
          console.log(error.message)
        }
      )
    }

    public openModal(modalType: string, id: string, object: any) {
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
      if (modalType === "add") {
        this.post = object;
      }
    }


  // hide Comments
  public viewComments = false;
  public toggleHideComments(id:any): void {
    this.viewComments = !this.viewComments;
  }
  public toggleComments():void{
    this.addComment = !this.addComment;
  }


}
