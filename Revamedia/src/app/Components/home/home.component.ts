import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
  posts: any[] = [];
  public post: any;
  public comment: any;

  // Variables Used In Home Component
  public totalLikes: number = 0;

  constructor(
    public CommentService: CommentService,
    private userPostsService: UserPostsService,
    public userService: UserService,
    public gifService: GiphyService,
    public animationService: AnimationService,
    public router: Router,
    private searchService: SearchService)
  { }


  ngOnInit(): void {
    this.getGifs('funny');
    this.getCurrentUserData();
    this.openingAnimation();
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
          this.posts.push(f?.followedId?.postsOwned);
        }
        this.posts = this.posts.flat();
        this.posts.sort((a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime());
      },
      (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    );
  }

  // Add Comment
  public onAddComment(commentForm: NgForm): void {
    this.CommentService.addComment(commentForm.value).subscribe(
      (response: any) => {
        this.getCurrentUserData();
        // this.getAllPost();
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
    this.userService.userLikesPost(p);
    this.getCurrentUserData();
  }

  onAddPost(postForm: NgForm): void {
    this.userPostsService.addPost(postForm.value).subscribe(
      (response: any) => {
        this.closeModal('add', 'post-modal');
        this.getCurrentUserData();
      },
      (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    );

  }

  onUpdatePost(postForm: NgForm): void {
    this.userPostsService.updatePost(postForm.value).subscribe(
      (response: any) => {

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

  // Add REPLY
  public onAddReply(replyForm: NgForm): void {
    this.CommentService.addReply(replyForm.value).subscribe(
      (response: any) => {
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
      },
      (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    )
  }

  public searchGiphy() {
    var search = document.getElementById('giphy-search-comment') as HTMLInputElement;
    let query = search?.value;
    let cleanQuery = query.trim();
    let cleanQuery2 = cleanQuery.replace(" ", "+");
    this.getGifs(cleanQuery2);
    if (query == "") {
      this.getGifs("happy");
    }
  }

  public searchGiphyForReply(type: any) {
    var search = document.getElementById(`giphy-search-${type}`) as HTMLInputElement;
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

  allUsers: any[] = [];
  searchUser(searchKey: string){
    this.searchService.searchUser(searchKey).subscribe(
      (response: any) => {
        this.allUsers = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
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
        this.getCurrentUserData();
        // this.getAllPost();
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

        this.getCurrentUserData();
        // this.getAllPost();
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
        this.getCurrentUserData();
        // this.getAllPost();
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
