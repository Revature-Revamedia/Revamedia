import { UserService } from './../../Shared/services/user-service/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommentService } from '../../Shared/services/user-comments-service/comment.service';
import { faFaceGrinTongueSquint } from '@fortawesome/free-solid-svg-icons';
import { GiphyService } from '../../Shared/services/giphy-service/giphy.service';


@Component({
  selector: 'app-post-comment-add',
  templateUrl: './post-comment-add.component.html',
  styleUrls: ['./post-comment-add.component.scss']
})
export class PostCommentAddComponent implements OnInit {

  @Input() post: any;
  public user: any;
  public faFaceGrinTongueSquint = faFaceGrinTongueSquint; //icon
  constructor(private CommentService:CommentService , public gifService: GiphyService, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getCurrentUser();
    console.log("fatima inside add comment", this.user);
    this.getGifs('funny');
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


    // Add Comment
    public onAddComment(commentForm: NgForm): void {
      this.CommentService.addComment(commentForm.value).subscribe(
        (response: any) => {
          this.selectedGiphy = "";
        },
        (error: HttpErrorResponse) => {
          console.log(error.message)
        }
      )
    } // ADD COMMENT END

    public selectedGiphy = "";
    public selectGiphy(url: any) {
      this.selectedGiphy = url;
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

}
