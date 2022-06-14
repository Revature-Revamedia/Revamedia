import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimationService } from 'src/app/Shared/services/animation/animation.service';
import { GroupService } from 'src/app/Shared/services/group-service/group.service';
import { UserService } from 'src/app/Shared/services/user-service/user.service';

import { GroupComponent } from './group.component';

describe('GroupComponent', () => {
  let component: GroupComponent;
  let fixture: ComponentFixture<GroupComponent>;

  let groupServiceSpy: {
    getGroupById: jasmine.Spy,
    deleteGroup: jasmine.Spy,
    updateGroup: jasmine.Spy
  };
  let aRouterspy: { snapshot: { paramMap: { get: (id: number) => {} } }};
  let routerSpy: { navigate: jasmine.Spy };
  let userServiceSpy: { getUser: jasmine.Spy };
  let animationsServiceSpy: { fadeIn: jasmine.Spy };

  beforeEach(async () => {
    groupServiceSpy = jasmine.createSpyObj('GroupServiceSpy', ['getGroupById', 'deleteGroup', 'updateGroup']);
    routerSpy = jasmine.createSpyObj('RouterSpy', ['navigate']);
    userServiceSpy = jasmine.createSpyObj('UserServiceSpy', ['getUser']);
    animationsServiceSpy = jasmine.createSpyObj('AnimationServiceSpy', ['fadeIn']);

    await TestBed.configureTestingModule({
      imports: [ FormsModule ],
      providers: [
        { provide: GroupService, useValue: groupServiceSpy },
        { provide: ActivatedRoute, useValue: aRouterspy },
        { provide: Router, useValue: routerSpy },
        { provide: UserService, useValue: userServiceSpy },
        { provide: UserService, useValue: userServiceSpy },
        { provide: AnimationService, useValue: animationsServiceSpy },
      ],
      declarations: [ GroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
