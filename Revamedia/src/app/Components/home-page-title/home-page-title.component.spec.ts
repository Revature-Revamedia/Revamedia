import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageTitleComponent } from './home-page-title.component';

describe('HomePageTitleComponent', () => {
  let component: HomePageTitleComponent;
  let fixture: ComponentFixture<HomePageTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePageTitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
