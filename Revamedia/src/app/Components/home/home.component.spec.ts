import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AnimationService } from 'src/app/Shared/services/animation/animation.service';
import { GiphyService } from 'src/app/Shared/services/giphy-service/giphy.service';
import { SearchService } from 'src/app/Shared/services/search-service/search.service';
import { CommentService } from 'src/app/Shared/services/user-comments-service/comment.service';
import { UserPostsService } from 'src/app/Shared/services/user-posts-service/user-posts.service';
import { UserService } from 'src/app/Shared/services/user-service/user.service';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  // Spies
  let commentServiceSpy: {
    addComment: jasmine.Spy,
    updateComment: jasmine.Spy,
    deleteComment: jasmine.Spy,
    addReply: jasmine.Spy,
    updateReply: jasmine.Spy,
    deleteReply: jasmine.Spy
  };
  let userPostServiceSpy: {
    updatePostLikes: jasmine.Spy,
    addPost: jasmine.Spy,
    updatePost: jasmine.Spy,
    deletePost: jasmine.Spy,
    addYoutube: jasmine.Spy,
    editYoutube: jasmine.Spy,
    deleteYoutube: jasmine.Spy
  };
  let userServiceSpy: {
    getUser: jasmine.Spy,
    userLikesPost: jasmine.Spy,
    setCurrentUser: jasmine.Spy
  };
  let giphyServiceSpy: { getGIFS: jasmine.Spy };
  let animationServiceSpy: { fadeIn: jasmine.Spy };
  let routerSpy: { navigate: jasmine.Spy };
  let searchServiceSpy: { searchUser: jasmine.Spy };

  const error = { message: "Error message" } as HttpErrorResponse;

  beforeEach(async () => {
    commentServiceSpy = jasmine.createSpyObj("CommentServiceSpy", ['addComment', 'updateComment', 'deleteComment', 'addReply', 'updateReply', 'deleteReply']);
    userPostServiceSpy = jasmine.createSpyObj("UserPostServiceSpy", ['updatePostLikes','addPost','updatePost','deletePost','addYoutube','editYoutube','deleteYoutube',])
    giphyServiceSpy = jasmine.createSpyObj("GifServiceSpy", ['getGIFS']);
    userServiceSpy = jasmine.createSpyObj("UserServiceSpy", ['getUser', 'userLikesPost', 'setCurrentUser']);
    animationServiceSpy = jasmine.createSpyObj("AnimationServiceSpy", ['fadeIn']);
    routerSpy = jasmine.createSpyObj("RouterSpy", ['navigate']);
    searchServiceSpy = jasmine.createSpyObj("SearchServiceSpy", ['searchUser']);

    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [
        FormsModule
      ],
      providers: [
        { provide: CommentService, useValue: commentServiceSpy },
        { provide: UserPostsService, useValue: userPostServiceSpy },
        { provide: UserService, useValue: userServiceSpy },
        { provide: GiphyService, useValue: giphyServiceSpy },
        { provide: AnimationService, useValue: animationServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: SearchService, useValue: searchServiceSpy },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#ngOnInit calls #getGifs, triggers opening animation and loads user data into component', () => {
    spyOn(component, 'getGifs');
    spyOn(component, 'openingAnimation');
    spyOn(component, 'getCurrentUserData');

    component.ngOnInit();

    expect(component.getGifs).toHaveBeenCalledOnceWith('funny');
    expect(component.getCurrentUserData).toHaveBeenCalledTimes(1);
    expect(component.openingAnimation).toHaveBeenCalledTimes(1);
  });

  describe('#onAddComment', () => {
    const commentFormToPassIn = { value: "formValue"} as NgForm;

    it('should update current user on userService', fakeAsync(() => {
      commentServiceSpy.addComment.and.returnValue(of(commentFormToPassIn.value));
      spyOn(component, 'getCurrentUserData').and.returnValue();

      component.onAddComment(commentFormToPassIn);
      tick();

      expect(component.getCurrentUserData).toHaveBeenCalledTimes(1);
      expect(component.addComment).toEqual(false);
    }));

    it('should log error message on failing to add comment', fakeAsync(() => {
      commentServiceSpy.addComment.and.returnValue(throwError(() => error));
      spyOn(console, 'log');

      component.onAddComment(commentFormToPassIn);
      tick();

      expect(console.log).toHaveBeenCalledWith(error.message);
    }));
  });

  describe('#onEditComment', () => {
    const commentFormToPassIn = { value: "formValue"} as NgForm;

    it('should update current user on success', fakeAsync(() => {
      const responseExpected = { body: { data: "data"}};
      commentServiceSpy.updateComment.and.returnValue(of(responseExpected));
      spyOn(component, 'getCurrentUserData').and.returnValue();
      spyOn(component, 'closeModal');

      component.onEditComment(commentFormToPassIn);
      tick();

      expect(component.closeModal).toHaveBeenCalledOnceWith('edit', 'comment-modal');
      expect(component.getCurrentUserData).toHaveBeenCalledTimes(1);
    }));

    it('should log error on fail', fakeAsync(() => {
      commentServiceSpy.updateComment.and.returnValue(throwError(() => error));
      spyOn(console, 'log');

      component.onEditComment(commentFormToPassIn);
      tick();

      expect(console.log).toHaveBeenCalledOnceWith(error.message);
    }));

  });

  describe('#onDeleteComment', () => {
    const id: number = 55;

    it('should update current user on success', fakeAsync(() => {
      const responseExpected = { body: { data: "data"}};
      commentServiceSpy.deleteComment.and.returnValue(of(responseExpected));
      spyOn(component, 'getCurrentUserData').and.returnValue();
      spyOn(component, 'closeModal');

      component.onDeleteComment(id);
      tick();

      expect(component.closeModal).toHaveBeenCalledOnceWith('delete', 'comment-modal');
      expect(component.getCurrentUserData).toHaveBeenCalledTimes(1);
    }));

    it('should log error on fail', fakeAsync(() => {
      commentServiceSpy.deleteComment.and.returnValue(throwError(() => error));
      spyOn(console, 'log');

      component.onDeleteComment(id);
      tick();

      expect(console.log).toHaveBeenCalledOnceWith(error.message);
    }));
  });

  describe('#likePost', () => {
    const currentPost = { postId: 55 };

    it('should set the result of totalLikes to userService#userLikesPost', () => {
      component.user = { userId: 5 };
      component.totalLikes = 0;
      userServiceSpy.userLikesPost.and.returnValue(100);
      spyOn(component, 'getCurrentUserData').and.returnValue();

      component.likePost(currentPost);

      expect(component.getCurrentUserData).toHaveBeenCalledTimes(1);
      expect(userServiceSpy.userLikesPost).toHaveBeenCalledOnceWith({ userId: component.user.userId, postId: currentPost.postId });
      expect(component.totalLikes).toEqual(100);
    });
  });

  describe('#onAddPost', () => {
    const postFormToPassIn = { value: "formValue"} as NgForm;

    it('should call closeModal with proper arguments on success', fakeAsync(() => {
      userPostServiceSpy.addPost.and.returnValue(of({}));
      spyOn(component, 'closeModal');
      spyOn(component, 'getCurrentUserData').and.returnValue();

      component.onAddPost(postFormToPassIn);
      tick();

      expect(component.getCurrentUserData).toHaveBeenCalledTimes(1);
      expect(component.closeModal).toHaveBeenCalledWith('add', 'post-modal');
    }));

    it('should log error on fail', fakeAsync(() => {
      userPostServiceSpy.addPost.and.returnValue(throwError(() => error));
      spyOn(console, 'log');

      component.onAddPost(postFormToPassIn);
      tick();

      expect(console.log).toHaveBeenCalledOnceWith(error.message);
    }));
  });

  describe('#onUpdatePost', () => {
    const postFormToPassIn = { value: "formValue"} as NgForm;

    it('should call closeModal with proper arguments on success', fakeAsync(() => {
      userPostServiceSpy.updatePost.and.returnValue(of({}));
      spyOn(component, 'closeModal');
      spyOn(component, 'getCurrentUserData').and.returnValue();

      component.onUpdatePost(postFormToPassIn);
      tick();

      expect(component.getCurrentUserData).toHaveBeenCalledTimes(1);
      expect(component.closeModal).toHaveBeenCalledWith('edit', 'post-modal');
    }));

    it('should log error on fail', fakeAsync(() => {
      userPostServiceSpy.updatePost.and.returnValue(throwError(() => error));
      spyOn(console, 'log');

      component.onUpdatePost(postFormToPassIn);
      tick();

      expect(console.log).toHaveBeenCalledOnceWith(error.message);
    }));
  });

  describe('#onDeletePost', () => {
    const id: number = 101;

    it('should call closeModal with proper arguments on success', fakeAsync(() => {
      userPostServiceSpy.deletePost.and.returnValue(of({}));
      spyOn(component, 'closeModal');
      spyOn(component, 'getCurrentUserData').and.returnValue();

      component.onDeletePost(id);
      tick();

      expect(component.getCurrentUserData).toHaveBeenCalledTimes(1);
      expect(component.closeModal).toHaveBeenCalledWith('delete', 'post-modal');
      expect(component.getCurrentUserData).toHaveBeenCalledTimes(1);
    }));

    it('should log error on fail', fakeAsync(() => {
      userPostServiceSpy.deletePost.and.returnValue(throwError(() => error));
      spyOn(console, 'log');

      component.onDeletePost(id);
      tick();

      expect(console.log).toHaveBeenCalledOnceWith(error.message);
    }));
  });

  describe('#onAddReply', () => {
    const replyFormToPassIn = { value: "formValue"} as NgForm;

    it('should set addReply to false on success', fakeAsync(() => {
      commentServiceSpy.addReply.and.returnValue(of({}));
      spyOn(component, 'getCurrentUserData').and.returnValue();

      component.onAddReply(replyFormToPassIn);

      expect(commentServiceSpy.addReply).toHaveBeenCalledOnceWith(replyFormToPassIn.value);
      expect(component.getCurrentUserData).toHaveBeenCalledTimes(1);
      expect(component.addReply).toBeFalse();
    }));

    it('should log error on fail', fakeAsync(() => {
      commentServiceSpy.addReply.and.returnValue(throwError(() => error));
      spyOn(console, 'log');

      component.onAddReply(replyFormToPassIn);
      tick();

      expect(commentServiceSpy.addReply).toHaveBeenCalledOnceWith(replyFormToPassIn.value);
      expect(console.log).toHaveBeenCalledOnceWith(error.message);
    }));
  });

  describe('#onEditReply', () => {
    const replyFormToPassIn = { value: "formValue"} as NgForm;

    it('should call closeModal with proper arguments on success', fakeAsync(() => {
      commentServiceSpy.updateReply.and.returnValue(of({}));
      spyOn(component, 'getCurrentUserData').and.returnValue();
      spyOn(component, 'closeModal');

      component.onEditReply(replyFormToPassIn);
      tick();

      expect(component.closeModal).toHaveBeenCalledWith('edit', 'reply-modal');
      expect(component.getCurrentUserData).toHaveBeenCalledTimes(1);
    }));

    it('should log error on fail', fakeAsync(() => {
      commentServiceSpy.updateReply.and.returnValue(throwError(() => error));
      spyOn(console, 'log');

      component.onEditReply(replyFormToPassIn);
      tick();

      expect(console.log).toHaveBeenCalledOnceWith(error.message);
    }));
  });

  describe('#onDeleteReply', () => {
    const id: number = 44;

    it('should call closeModal with proper arguments on success', fakeAsync(() => {
      commentServiceSpy.deleteReply.and.returnValue(of({}));
      spyOn(component, 'closeModal');
      spyOn(component, 'getCurrentUserData').and.returnValue();

      component.onDeleteReply(id);
      tick();

      expect(component.getCurrentUserData).toHaveBeenCalledTimes(1);
      expect(component.closeModal).toHaveBeenCalledWith('delete', 'reply-modal');
    }));

    it('should log error on fail', fakeAsync(() => {
      commentServiceSpy.deleteReply.and.returnValue(throwError(() => error));
      spyOn(console, 'log');

      component.onDeleteReply(id);
      tick();

      expect(console.log).toHaveBeenCalledOnceWith(error.message);
    }));
  });

  it('#toggleHideComments should toggle boolean value in component.viewComments', () => {
    component.viewComments = true;

    component.toggleHideComments(44);

    expect(component.viewComments).toBeFalse();
  });

  it('#toggleComments should toggle boolean value in component.addComment', () => {
    component.addComment = false;

    component.toggleComments();

    expect(component.viewComments).toBeTrue();
  });

  it('#openAddComment should set component.addComment to true', () => {
    component.openAddComment();

    expect(component.addComment).toBeTrue();
  });

  it('#closeAddComment should set component.addComment to false', () => {
    component.closeAddComment();

    expect(component.addComment).toBeFalse();
  });

  it('#fileName should update element text', () => {
    const event = {
      target: {
        files: [
          {name: "name one"},
          {name: "name two"},
          {name: "name three"},
          {name: "name four"},
          {name: "name five"},
        ]
      }
    };
    const target: string = "target";
    const div: HTMLElement = document.createElement('div');
    spyOn(document, 'getElementById').and.returnValue(div);

    component.fileName(event, target);

    expect(document.getElementById).toHaveBeenCalledOnceWith('target-fileName');
    expect(div.textContent).toEqual("name five");
  });

  it('#openAddReply should set component.addReply to true', () => {
    component.openAddReply();

    expect(component.addReply).toBeTrue();
  });

  it('#closeAddReply should set component.addReply to false', () => {
    component.closeAddReply();

    expect(component.addReply).toBeFalse();
  });

  it('#toggleCommentsOptions should toggle the boolean value in component.commentOptionsClicked', () => {
    component.commentOptionsClicked = false;

    component.toggleCommentsOptions();

    expect(component.commentOptionsClicked).toBeTrue();
  });

  describe('#openModal', () => {
    let modalType: string;
    const id: string = "44";
    const object: any = {};
    const div: HTMLElement = document.createElement('div');
    const formDiv: HTMLElement = document.createElement('div');

    beforeEach(() => {
      spyOn(document, 'getElementById').and.returnValue(div);
      spyOn(div.classList, 'add');
    });

    it('if modalType is "edit" update component data correctly', () => {
      modalType = "edit";

      component.openModal(modalType, id, object);
      expect(component.commentOptionsClicked).toBeFalse();
      expect(component.editComment).toEqual(object);
      expect(component.editReply).toEqual(object);
      expect(component.editPost).toEqual(object);
      expect(component.editYoutube).toEqual(object);
    });

    it('if modalType is "delete" update component data correctly', () => {
      modalType = "delete";

      component.openModal(modalType, id, object);
      expect(component.commentOptionsClicked).toBeFalse();
      expect(component.deleteComment).toEqual(object);
      expect(component.deleteReply).toEqual(object);
      expect(component.deletePost).toEqual(object);
      expect(component.deleteYoutube).toEqual(object);
    });

    it('if modalType is "add" update component data correctly', () => {
      modalType = "add";

      component.openModal(modalType, id, object);

      expect(component.post).toEqual(object);
    });
  });

  describe('#closeModal', () => {
    const div: HTMLElement = document.createElement('div');
    let modalType: string = "edit";
    let post: string = "post";

    beforeEach(() => {
      spyOn(document, 'getElementById').and.returnValue(div);
      spyOn(div.classList, 'remove');
    });

    it('should remove "openScreen" class from div', () => {
      component.closeModal(modalType, post);

      expect(div.classList.remove).toHaveBeenCalledWith('openScreen');
    });

    it('should remove "openModal" class from div', () => {
      component.closeModal(modalType, post);

      expect(div.classList.remove).toHaveBeenCalledWith('openModal');
    });
  });

  describe('#getGifs', () => {
    const search: string = "searchString";
    const responseExpected = { data: "data" };

    it('should update component.gifs on success', fakeAsync(() => {
      giphyServiceSpy.getGIFS.and.returnValue(of(responseExpected));

      component.getGifs(search);
      tick();

      expect(component.gifs).toEqual(responseExpected.data);
    }));

    it('should log error on fail', fakeAsync(() => {
      giphyServiceSpy.getGIFS.and.returnValue(throwError(() => error));
      spyOn(console, 'log');

      component.getGifs(search);

      expect(console.log).toHaveBeenCalledOnceWith(error.message);
    }));
  });

  describe('#searchGiphy', () => {
    const searchDiv: HTMLInputElement = document.createElement('input');

    beforeEach(() => {
      spyOn(component, 'getGifs');
    });

    it('should call #getGifs with custom query', () => {
      searchDiv.value = " custom query ";
      spyOn(document, 'getElementById').and.returnValue(searchDiv);

      component.searchGiphy();

      expect(component.getGifs).toHaveBeenCalledWith('custom+query');
    });

    it('should call #getGifs with "happy" as default if no query is specified', () => {
      searchDiv.value = "";
      spyOn(document, 'getElementById').and.returnValue(searchDiv);

      component.searchGiphy();

      expect(component.getGifs).toHaveBeenCalledWith('happy');
    });
  });
  describe('#searchGiphyForReply', () => {
    const searchDiv: HTMLInputElement = document.createElement('input');

    beforeEach(() => {
      spyOn(component, 'getGifs');
    });

    it('should call #getGifs with custom query', () => {
      searchDiv.value = " custom query ";
      spyOn(document, 'getElementById').and.returnValue(searchDiv);

      component.searchGiphyForReply();

      expect(component.getGifs).toHaveBeenCalledWith('custom+query');
    });

    it('should call #getGifs with "happy" as default if no query is specified', () => {
      searchDiv.value = "";
      spyOn(document, 'getElementById').and.returnValue(searchDiv);

      component.searchGiphyForReply();

      expect(component.getGifs).toHaveBeenCalledWith('happy');
    });
  });

  it('#selectGiphy should set component.selectedGiphy to specified url', () => {
    const url: string = "http://www.randomUrl.com";

    component.selectGiphy(url);

    expect(component.selectedGiphy).toEqual(url);
  });

  it('#openingAnimation should fade in main element', () => {
    component.openingAnimation();
    expect(animationServiceSpy.fadeIn).toHaveBeenCalledOnceWith("#main", jasmine.any(Number), jasmine.any(Number), jasmine.any(Number),)
  });

  it('#goToProfile should navigate user to correct route', () => {
    const userId: number = 44;

    component.goToProfile(userId);

    expect(routerSpy.navigate).toHaveBeenCalledOnceWith(['profile/44']);
  });

  describe('#searchUser', () => {
    let searchKey: string;
    const responseExpected = [{ username: "Jeff"}, { username: "Jacob"}];

    it('should update component.allUsers on success', fakeAsync(() => {
      searchKey = 'Jeff';
      searchServiceSpy.searchUser.and.returnValue(of(responseExpected));

      component.searchUser(searchKey);
      tick();

      expect(searchServiceSpy.searchUser).toHaveBeenCalledOnceWith(searchKey);
      expect(component.allUsers).toEqual(responseExpected);
    }));

    it('should log error on fail', fakeAsync(() => {
      searchKey = 'Jeff';
      searchServiceSpy.searchUser.and.returnValue(throwError(() => error));
      spyOn(console, 'log');

      component.searchUser(searchKey);
      tick();

      expect(searchServiceSpy.searchUser).toHaveBeenCalledOnceWith(searchKey);
      expect(console.log).toHaveBeenCalledOnceWith(error.message)
    }));

    it('should reset value of component.allUsers to empty array if searchKey is empty string', fakeAsync(() => {
      searchKey = '';
      searchServiceSpy.searchUser.and.returnValue(of(responseExpected));

      component.searchUser(searchKey);
      tick();

      expect(searchServiceSpy.searchUser).toHaveBeenCalledOnceWith(searchKey);
      expect(component.allUsers).toEqual([]);
    }));
  });

  describe('#shareVideo', () => {
    const form = {
      value: {
        userId: 44,
        youtubeLink: "http://youtube.com/asdf",
        message: "custom message"
      }
    } as NgForm;

    it('should close modal on success', fakeAsync(() => {
      userPostServiceSpy.addYoutube.and.returnValue(of({}));
      spyOn(component, 'closeModal');
      spyOn(component, 'getCurrentUserData').and.returnValue();

      component.shareVideo(form);
      tick();

      expect(component.getCurrentUserData).toHaveBeenCalledTimes(1);
      expect(component.closeModal).toHaveBeenCalledOnceWith('add', 'youtube-modal');
    }));

    it('should log error on fail', fakeAsync(() => {

      userPostServiceSpy.addYoutube.and.returnValue(throwError(() => error));
      spyOn(console, 'log');

      component.shareVideo(form);
      tick();

      expect(console.log).toHaveBeenCalledOnceWith(error.message)
    }));
  });

  describe('#editVideo', () => {
    const form = {
      value: {
        userId: 44,
        youtubeLink: "http://youtube.com/asdf",
        message: "custom message"
      }
    } as NgForm;

    it('should close modal on success', fakeAsync(() => {
      userPostServiceSpy.editYoutube.and.returnValue(of({}));
      spyOn(component, 'getCurrentUserData').and.returnValue();
      spyOn(component, 'closeModal');

      component.editVideo(form);
      tick();

      expect(component.getCurrentUserData).toHaveBeenCalledTimes(1);
      expect(component.closeModal).toHaveBeenCalledOnceWith('edit', 'youtube-modal');
    }));

    it('should log error on fail', fakeAsync(() => {

      userPostServiceSpy.editYoutube.and.returnValue(throwError(() => error));
      spyOn(console, 'log');

      component.editVideo(form);
      tick();

      expect(console.log).toHaveBeenCalledOnceWith(error.message)
    }));
  });

  describe('#deleteVideo', () => {
    const id: number = 1000;

    it('should close modal on success', fakeAsync(() => {
      userPostServiceSpy.deleteYoutube.and.returnValue(of({}));
      spyOn(component, 'closeModal');
      spyOn(component, 'getCurrentUserData').and.returnValue();

      component.deleteVideo(id);
      tick();

      expect(component.getCurrentUserData).toHaveBeenCalledTimes(1);
      expect(component.closeModal).toHaveBeenCalledOnceWith('delete', 'youtube-modal');
    }));

    it('should log error on fail', fakeAsync(() => {

      userPostServiceSpy.deleteYoutube.and.returnValue(throwError(() => error));
      spyOn(console, 'log');

      component.deleteVideo(id);
      tick();

      expect(console.log).toHaveBeenCalledOnceWith(error.message)
    }));
  });

  //TODO: 2 MORE METHODS
});
