import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
//icons
import { faHeart, faBookmark, faComment, faShareFromSquare, faFaceGrinStars, faFaceGrinTongueSquint, faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { CommentService } from '../../Shared/services/user-comments-service/comment.service';
import { UserPostsService } from '../../Shared/services/user-posts-service/user-posts.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../Shared/services/user-service/user.service';
import { GiphyService } from '../../Shared/services/giphy-service/giphy.service';
import { ThisReceiver } from '@angular/compiler';
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
  posts: any[] = [];
  public post: any;
  public comment: any;

  // Variables Used In Home Component
  public totalLikes: number = 0;

  constructor(public CommentService: CommentService, private userPostsService: UserPostsService, private http: HttpClient, public userService: UserService, public gifService: GiphyService, public animationService: AnimationService, public router: Router, private searchService: SearchService) { }

  ngOnInit(): void {
    // this.getAllComments();
    this.getGifs('funny');
    this.getCurrentUserData();
    this.openingAnimation();
    // this.userService.getCurrentUser().subscribe({
    //   next: response => {
    //     this.user = response;
    //     console.log(response);

    //     let f: any;
    //     this.posts = [];
    //     for (f of response.following) {
    //       this.posts.push(f.followedId.postsOwned);
    //     }
    //     console.log(this.posts);
    //     this.posts = this.posts.flat();
    //     //.sort((a, b) => b.dateCreated.getTime() - a.dateCreated.getTime())
    //     console.log(this.posts.sort((a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()));
    //     //b.date.getTime() - a.date.getTime();
    //   },
    //   error: err => {
    //     console.error(err);
    //   }
    // });
  }

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
        this.posts.sort((a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime());
        // this.posts = followingPost.concat(userPosts);
        // for(let p of response?.postsOwned){
        //   this.posts.push(p);
        //   this.posts = this.posts.flat();
        // }
        //this.openingAnimation();
        // console.log(this.posts);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    );
  }

  // // Back End Work
  public (currentPost: any): void {
    this.userPostsService.updatePostLikes(this.postToLike).subscribe(
      (data) => {
        // console.log(data.body.likes.length);
        // this.totalLikes = data.body.likes.length;
        let p = {
          userId: 0,
          postId: 0,
        }
        p.postId = currentPost.postId;
        p.userId = this.user.userId;
        console.log(p);
        // this.getCurrentUserData();
        this.userService.userLikesPost(p);
        // this.getCurrentUserData();
      }
    )
  }

  // likePost(): void {

  // // // Get All Comments
  // // // public getAllComments(): void{
  // // //   this.CommentService.getAllComments().subscribe(
  // // //     (response: any) => {
  // // //       this.comments.push(response.data);
  // // //     },
  // // //     (error: HttpErrorResponse) => {
  // // //       console.log(error.message)
  // // //     }
  // // //   )
  // // // }


  // //    // get all comments for given post

  // //       // console.log(data.body.comments);
  // //       // console.log(data.body.comments[0]);
  // //       // this.comments = data.body.comments;

  // //       // for (var cur of this.comments) {
  // //       //   console.log(cur);
  // //       // }


  // //   // get all users -> get all owned posts

  // //   // this.userPostsService.getUsers().subscribe((data) => {


  // //   //   this.users = data.body;
  // //   //   console.log("all users:");
  // //   //   console.log(this.users);

  // //   //   // loop through all users
  // //   //   for (var user of this.users) {
  // //   //     // loop through all owned posts for each user
  // //   //     for (var post of user.postsOwned)
  // //   //       // add post to post array
  // //   //       this.posts.push(post)
  // //   //   }
  // //   //   console.log("all posts:");
  // //   //   console.log(this.posts);


  // //   //   //for (var follow of this.currentuser.following)
  // //   //       //getuser

  // //   // });

  // }

  // Add Comment
  public onAddComment(commentForm: NgForm): void {
    this.CommentService.addComment(commentForm.value).subscribe(
      (response: any) => {
        // console.log(response);
        // console.log(commentForm.value);
        this.getCurrentUserData();
        this.addComment = false;
        this.viewComments = true;
        this.selectedGiphy = "";
        // this.userService.setCurrentUser(response.body);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    )
  } // ADD COMMENT END

  // EDIT COMMENT

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
  // DELETE REPLY
  public onDeleteComment(id: number) {
    this.CommentService.deleteComment(id).subscribe(
      (response: any) => {
        //console.log(response);
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


  likePost(currentPost: any): void {
    let p = {
      userId: 0,
      postId: 0,
    }
    p.postId = currentPost.postId;
    p.userId = this.user.userId;

    this.totalLikes = this.userService.userLikesPost(p);
    this.getCurrentUserData();
  }


  onAddPost(postForm: NgForm): void {
    this.userPostsService.addPost(postForm.value).subscribe(
      (response: any) => {
        // console.log(response);
        this.closeModal('add', 'post-modal');
        this.getCurrentUserData();
      },
      (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    );
    //console.log(postForm.value);
  }

  onUpdatePost(postForm: NgForm): void {
    //console.log(postForm.value);
    this.userPostsService.updatePost(postForm.value).subscribe(
      (response: any) => {
        console.log(response);
        this.closeModal('edit', 'post-modal');
        this.getCurrentUserData();
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
        this.getCurrentUserData();
      },
      (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    )
  }


  // get all comments for given post

  // console.log(data.body.comments);
  // console.log(data.body.comments[0]);
  // this.comments = data.body.comments;

  // for (var cur of this.comments) {
  //   console.log(cur);
  // }


  // get all users -> get all owned posts

  // this.userPostsService.getUsers().subscribe((data) => {

  //   this.users = data.body;
  //   console.log("all users:");
  //   console.log(this.users);

  //   // loop through all users
  //   for (var user of this.users) {
  //     // loop through all owned posts for each user
  //     for (var post of user.postsOwned)
  //       // add post to post array
  //       this.posts.push(post)
  //   }
  //   console.log("all posts:");
  //   console.log(this.posts);

  // Add REPLY
  public onAddReply(replyForm: NgForm): void {
    this.CommentService.addReply(replyForm.value).subscribe(
      (response: any) => {
        // console.log(response);
        // console.log(replyForm.value);
        this.getCurrentUserData();
        this.addReply = false;
        this.selectedGiphy = "";
      },
      (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    );
  } // ADD COMMENT END


  // EDIT REPLY START
  public onEditReply(replyForm: NgForm): void {
    let message = replyForm.value.message;
    let replyId = replyForm.value.reply_id;
    this.CommentService.updateReply(message, replyId).subscribe(
      (response: any) => {
        // console.log(response);
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
        // console.log(response);
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
  public toggleHideComments(): void {
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
        // console.log(this.gifs);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    )
  }

  public searchGiphy() {
    var search = document.getElementById('giphy-search-comment') as HTMLInputElement;
    // console.log(search);
    let query = search?.value;
    console.log(query);
    let cleanQuery = query.trim();
    let cleanQuery2 = cleanQuery.replace(" ", "+");
    this.getGifs(cleanQuery2);
    if (query == "") {
      this.getGifs("happy");
    }
  }

  public searchGiphyForReply() {
    var search = document.getElementById('giphy-search-reply') as HTMLInputElement;
    let query = search?.value;
    let cleanQuery = query.trim();
    let cleanQuery2 = cleanQuery.replace(" ", "+");
    this.getGifs(cleanQuery2);
    if (query == "") {
      this.getGifs("happy");
    }
  }

  public selectedGiphy = "";
  public selectGiphy(url: any) {
    this.selectedGiphy = url;
  }

  // ANIMATION
  public openingAnimation() {
    const anim = this.animationService;
    const main = '#main';
    anim.fadeIn(main, 0.7, 0, 1);
  }
  public goToProfile(userId: any){
    this.router.navigate([`profile/${userId}`]);
  }

  // public me: any;
  // getNextUser(){
  //   this.userService.getProfile(1).subscribe(
  //     (response: any) => {
  //       console.log(response);
  //       this.me = response;
  //     },
  //     (error: HttpErrorResponse) => {
  //       console.log(error.message)
  //     }
  //   )
  // }


  allUsers: any[] = [];
  searchUser(searchKey: string){
    // this.data = this.searchService.searchUser(searchKey);
    this.searchService.searchUser(searchKey).subscribe(
      (response: any) => {
        this.allUsers = response;
        console.log(this.allUsers);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    )
    if(searchKey === ''){
      this.allUsers = [];
    }
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
        console.log(response);
        this.getCurrentUserData();
        this.closeModal('add', 'youtube-modal');
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
        console.log(response);
        this.getCurrentUserData();
        this.closeModal('edit', 'youtube-modal');
      },
      (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    )

  }
  public deleteVideo(id: number){
    this.userPostsService.deleteYoutube(id).subscribe(
      (response: any) => {
        console.log(response);
        this.getCurrentUserData();
        this.closeModal('delete', 'youtube-modal');
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
