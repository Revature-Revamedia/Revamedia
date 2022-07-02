import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubeAddComponent } from './youtube-add.component';

describe('YoutubeAddComponent', () => {
  let component: YoutubeAddComponent;
  let fixture: ComponentFixture<YoutubeAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YoutubeAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YoutubeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
