import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { RegisterService } from '../../Shared/services/register-service/register.service';
import { Router } from '@angular/router';
import { IUserInterface } from '../../Shared/interfaces/IUserInterface';
import { HttpHeaders } from '@angular/common/http';


describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let registerServiceSpy: { createUser: jasmine.Spy }
  let router: { router: jasmine.Spy}

  beforeEach(async () => {
    registerServiceSpy = jasmine.createSpyObj('RegisterService', ['createUser']);
    router = jasmine.createSpyObj('Router', ['route'] );
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      providers: [
        {
          provide: RegisterService, useValue: registerServiceSpy,
          Router, routeValue: router
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component.registerHandler).toBeTruthy();
  })
  
});
