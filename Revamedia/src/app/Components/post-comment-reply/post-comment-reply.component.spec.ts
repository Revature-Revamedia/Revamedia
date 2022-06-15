import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCommentReplyComponent } from './post-comment-reply.component';

describe('PostCommentReplyComponent', () => {
  let component: PostCommentReplyComponent;
  let fixture: ComponentFixture<PostCommentReplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostCommentReplyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostCommentReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
