import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCommentAddComponent } from './post-comment-add.component';

describe('PostCommentAddComponent', () => {
  let component: PostCommentAddComponent;
  let fixture: ComponentFixture<PostCommentAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostCommentAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostCommentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
