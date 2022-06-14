import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimationService } from 'src/app/Shared/services/animation/animation.service';
import { GroupService } from 'src/app/Shared/services/group-service/group.service';
import { UserService } from 'src/app/Shared/services/user-service/user.service';

import { GroupsComponent } from './groups.component';

describe('GroupsComponent', () => {
  let component: GroupsComponent;
  let fixture: ComponentFixture<GroupsComponent>;

  let userServiceSpy: { getUser: jasmine.Spy };
  let groupsServiceSpy: { getAllGroups: jasmine.Spy, newGroup: jasmine.Spy, deleteGroup: jasmine.Spy };
  let routerSpy: { navigate: jasmine.Spy };
  let animationServiceSpy: { fadeIn: jasmine.Spy };

  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj('UserServiceSpy', ['getUser']);
    groupsServiceSpy = jasmine.createSpyObj('GroupsServiceSpy', ['getAllGroups', 'newGroup', 'deleteGroup']);
    routerSpy = jasmine.createSpyObj('RouterSpy', ['navigate']);
    userServiceSpy = jasmine.createSpyObj('AnimationServiceSpy', ['fadeIn']);

    await TestBed.configureTestingModule({
      imports: [ FormsModule ],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: GroupService, useValue: groupsServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: AnimationService, useValue: animationServiceSpy },
      ],
      declarations: [ GroupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
