import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
//icons
import { faHeart, faBookmark, faComment, faShareFromSquare, faFaceGrinStars, faFaceGrinTongueSquint, faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { CommentService } from '../../Shared/services/user-comments-service/comment.service';
import { UserPostsService } from '../../Shared/services/user-posts-service/user-posts.service';
import { UserService } from '../../Shared/services/user-service/user.service';
import { GiphyService } from '../../Shared/services/giphy-service/giphy.service';
import { AnimationService } from 'src/app/Shared/services/animation/animation.service';
import { SearchService } from 'src/app/Shared/services/search-service/search.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  postToLike: any = {
    userId: 1,
    postId: 1
  }

  public user: any;
  users: any[] = [];
  public posts: any[] = [];
  public comment: any;
  @Input() public addPostIsOn:boolean = false;

  // Variables Used In Home Component
  public totalLikes: number = 0;

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
    this.getCurrentUserData();
    this.getPosts();
  }

  // GET CURRENT USER
  public getCurrentUserData(){
    this.userService.getUser().subscribe(
      (response: any) => {
        this.user = response;
        console.log("user" , this.user)
        },
      (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    );
  }

    // GET ALL POSTS
    public getPosts(){
      this.userPostsService.getAllPosts().subscribe(
        (response: any) => {

          this.posts = response
          console.log("posts", this.posts)},
        (error: HttpErrorResponse) => {
          console.log(error.message)
        }
      );
    }


  // Front End Work
  public faHeart = faHeart; //icon
  public faBookmark = faBookmark; //icon
  public faComment = faComment; //icon
  public faShareFromSquare = faShareFromSquare; //icon
  public faFaceGrinStars = faFaceGrinStars; //icon
  public faFaceGrinTongueSquint = faFaceGrinTongueSquint; //icon
  public faTrashCan = faTrashCan; //icon
  public faPenToSquare = faPenToSquare; //icon

  // hide Comments
  public viewComments = false;
  public toggleHideComments(id:any): void {
    this.viewComments = !this.viewComments;
  }
  public toggleComments():void{
    this.addComment = !this.addComment;
  }


  // Add comment
  public addComment = false;
  public openAddComment() {
    this.addComment = true;
  }
  public closeAddComment(): void {
    this.addComment = false;
  }

  public fileName(event: any, target: string): void {
    var fileNames: any[] = event.target.files;
    const file = document.getElementById(`${target}-fileName`);
    for (let i = 0; i < fileNames.length; i++) {
      file!.textContent = fileNames[i].name;
    }
  }

  // Add Reply
  public addReply = false;
  public openAddReply() {
    this.addReply = true;
  }
  public closeAddReply() {
    this.addReply = false;
  }

  //comment options
  // post optional
  public commentOptionsClicked = false;
  public toggleCommentsOptions() {
    this.commentOptionsClicked = !this.commentOptionsClicked;
  }

  public editComment: any;
  public deleteComment: any;
  public editReply: any;
  public deleteReply: any;
  public editPost: any;
  public deletePost: any;
  public editYoutube: any;
  public deleteYoutube: any;




  public goToProfile(userId: any){
    this.router.navigate([`profile/${userId}`]);
  }


  public openNewPostForm(){
    this.addPostIsOn = true;
    console.log("tina",this.addPostIsOn)
  }

  closeNewPostForm() {
    this.addPostIsOn = false;
}




}
