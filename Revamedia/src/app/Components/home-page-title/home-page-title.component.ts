import { UserPostsService } from './../../Shared/services/user-posts-service/user-posts.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimationService } from 'src/app/Shared/services/animation/animation.service';
import { GiphyService } from 'src/app/Shared/services/giphy-service/giphy.service';
import { UserService } from 'src/app/Shared/services/user-service/user.service';
import { SearchService } from 'src/app/Shared/services/search-service/search.service';

@Component({
  selector: 'app-home-page-title',
  templateUrl: './home-page-title.component.html',
  styleUrls: ['./home-page-title.component.scss']
})
export class HomePageTitleComponent implements OnInit {


  public post: any;
  public editYoutube: any;
  public deleteYoutube: any;

  @Input() editReply: any;
  @Input() deleteReply:any;
  @Input() user:any;

  constructor(
    public gifService: GiphyService,
    public animationService: AnimationService,
    public userPostsService: UserPostsService,
    public router: Router,
    private searchService: SearchService
    )
  { }

  ngOnInit(): void {
    console.log("inside title" , this.user)
  }



  public closeModal(modalType: string, post: any) {
    // Screen
    const screen = document.getElementById('screen');
    screen?.classList.remove('openScreen');
    // Form
    const form = document.getElementById(`${modalType}-${post}`);
    form?.classList.remove('openModal');
  }


  // Youtube section
  // public shareVideo(form: NgForm){
  //   var youtubeDto = {
  //     userId: form.value.userId,
  //     youtubeLink: form.value.youtubeLink,
  //     message: form.value.message
  //   }
  //   this.userPostsService.addYoutube(youtubeDto).subscribe(
  //     (response: any) => {
  //       this.getCurrentUserData();
  //       this.closeModal('add', 'youtube-modal');
  //     },
  //     (error: HttpErrorResponse) => {
  //       console.log(error.message)
  //     }
  //   );
  // }

  // public editVideo(form: NgForm){
  //   var editYoutubeDto = {
  //     postId: form.value.postId,
  //     youtubeLink: form.value.youtubeLink,
  //     message: form.value.message
  //   }
  //   this.userPostsService.editYoutube(editYoutubeDto).subscribe(
  //     (response: any) => {

  //       this.getCurrentUserData();
  //       this.closeModal('edit', 'youtube-modal');
  //     },
  //     (error: HttpErrorResponse) => {
  //       console.log(error.message)
  //     }
  //   )

  // }
  // public deleteVideo(id: number){
  //   this.userPostsService.deleteYoutube(id).subscribe(
  //     (response: any) => {
  //       this.getCurrentUserData();
  //       this.closeModal('delete', 'youtube-modal');
  //     },
  //     (error: HttpErrorResponse) => {
  //       console.log(error.message)
  //     }
  //   )
  // }

  // public closeAnyModal(){
  //   // Screen
  //   const screen = document.getElementById('screen');
  //   screen?.classList.remove('openScreen');
  //   // Form
  //   const form1 = document.getElementById(`add-post-modal`);
  //   form1?.classList.remove('openModal');
  //   const form2 = document.getElementById(`edit-post-modal`);
  //   form2?.classList.remove('openModal');
  //   const form3 = document.getElementById(`delete-post-modal`);
  //   form3?.classList.remove('openModal');
  //   const form4 = document.getElementById(`add-comment-modal`);
  //   form4?.classList.remove('openModal');
  //   const form5 = document.getElementById(`edit-comment-modal`);
  //   form5?.classList.remove('openModal');
  //   const form6 = document.getElementById(`delete-comment-modal`);
  //   form6?.classList.remove('openModal');
  //   const form7 = document.getElementById(`add-reply-modal`);
  //   form7?.classList.remove('openModal');
  //   const form8 = document.getElementById(`edit-reply-modal`);
  //   form8?.classList.remove('openModal');
  //   const form9 = document.getElementById(`delete-reply-modal`);
  //   form9?.classList.remove('openModal');
  //   const form10 = document.getElementById(`add-youtube-modal`);
  //   form10?.classList.remove('openModal');
  //   const form11 = document.getElementById(`edit-youtube-modal`);
  //   form11?.classList.remove('openModal');
  //   const form12 = document.getElementById(`delete-youtube-modal`);
  //   form12?.classList.remove('openModal');
  // }

  public openModal(modalType: string, id: string, object: any) {
    console.log("modal", "id",id, object )
    // Screen
    const screen = document.getElementById('screen');
    screen?.classList.add('openScreen');
    // Form
    const form = document.getElementById(`${modalType}-${id}`);
    form?.classList.add('openModal');
    if (modalType === "add") {
      this.post = object;
    }
  }




  onAddPost(postForm: NgForm): void {
    console.log("fati")
    console.log(postForm.value);
    this.userPostsService.addPost(postForm.value).subscribe(

      (response: any) => {
        this.closeModal('add', 'post-modal');
      },
      (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    );

  }

  public goToProfile(userId: any){
    this.router.navigate([`profile/${userId}`]);
  }


  allUsers: any[] = [];
  searchUser(searchKey: string){
    // this.data = this.searchService.searchUser(searchKey);
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




}
