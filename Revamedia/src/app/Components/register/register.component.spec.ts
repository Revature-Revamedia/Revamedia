import { HttpHeaders } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { IRegisterError } from 'src/app/Shared/interfaces/IRegisterError.interface';
import { IUserInterface } from 'src/app/Shared/interfaces/IUserInterface';
import { RegisterService } from 'src/app/Shared/services/register-service/register.service';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let registerServiceSpy: { createUser: jasmine.Spy };
  let routerSpy: { navigateByUrl: jasmine.Spy };

  beforeEach(async () => {
    registerServiceSpy = jasmine.createSpyObj("RegisterService", ['createUser']);
    routerSpy = jasmine.createSpyObj("Router", ['navigateByUrl']);

    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [ FormsModule ],
      providers: [
        { provide: RegisterService, useValue: registerServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component.registerHandler).toBeTruthy();
  });

  it('#registerHandler should make a request to create a user', fakeAsync (() => {
    const user: IUserInterface = {
      id: undefined,
      firstName : "Jerry",
      lastName : "Jacobson",
      username : "JJ109",
      password : "passcode",
      email  : "jJac109@email.com"
    }

    registerServiceSpy.createUser.and.returnValue(of({}));

    component.registerHandler(user.username, user.password, user.firstName, user.lastName, user.email);
    tick();
    expect(registerServiceSpy.createUser).toHaveBeenCalledOnceWith(
      component.user,
      jasmine.objectContaining({headers: jasmine.any(HttpHeaders)})
    );
    expect(component.user).toEqual(user);
    expect(routerSpy.navigateByUrl).toHaveBeenCalledOnceWith('/login');
  }));

  it('#registerHandler should assign error on fail', fakeAsync(() => {
    const user: IUserInterface = {
      id: undefined,
      firstName : "Jerry",
      lastName : "Jacobson",
      username : "JJ109",
      password : "passcode",
      email  : "jJac109@email.com"
    };
    const customError: IRegisterError = {
      errorStatus: '400',
      errorFirstName: 'Joey',
      errorLastName: 'Sandoval',
      errorEmail: 'email@email.com',
      errorUsername: 'username',
      errorPassword: 'password'
    };
    registerServiceSpy.createUser.and.returnValue(throwError(() => { return customError }))

    component.registerHandler(user.username, user.password, user.firstName, user.lastName, user.email);
    tick();

    expect(registerServiceSpy.createUser).toHaveBeenCalledOnceWith(component.user, jasmine.objectContaining({ headers: jasmine.any(HttpHeaders) }));
    expect(component.error).toEqual(customError);

  }));

  // Check Input Method
  describe('#checkInput', () => {

    describe('invalid', () => {
      let input;

      beforeEach(() => {
        input = document.createElement('input');
        spyOn(document, 'querySelector').and.returnValue(input);
        spyOn(input, 'checkValidity').and.returnValue(false);
      });

      it('should assign a message to error first name', () => {
        const data: string = "fName";

        component.checkInput(data);

        expect(component.error.errorFirstName.length).toBeGreaterThan(0);
        expect(component.error.errorFirstName).toEqual(jasmine.any(String));
      });

      it('should assign a message to error last name', () => {
        const data: string = "lName";

        component.checkInput(data);

        expect(component.error.errorLastName.length).toBeGreaterThan(0);
        expect(component.error.errorLastName).toEqual(jasmine.any(String));
      });

      it('should assign a message to error email', () => {
        const data: string = "email";

        component.checkInput(data);

        expect(component.error.errorEmail.length).toBeGreaterThan(0);
        expect(component.error.errorEmail).toEqual(jasmine.any(String));
      });

      it('should assign a message to error username', () => {
        const data: string = "username";

        component.checkInput(data);

        expect(component.error.errorUsername.length).toBeGreaterThan(0);
        expect(component.error.errorUsername).toEqual(jasmine.any(String));
      });

      it('should assign a message to error password', () => {
        const data: string = "password";

        component.checkInput(data);

        expect(component.error.errorPassword.length).toBeGreaterThan(0);
        expect(component.error.errorPassword).toEqual(jasmine.any(String));
      });
    });

    describe('valid', () => {
      let input;

      beforeEach(() => {
        input = document.createElement('input');
        spyOn(document, 'querySelector').and.returnValue(input);
        spyOn(input, 'checkValidity').and.returnValue(true);
      });

      it('should reset value of error first name', () => {
        const data: string = "fName";

        component.checkInput(data);

        expect(component.error.errorFirstName.length).toEqual(0);
        expect(component.error.errorFirstName).toEqual(jasmine.any(String));
      });

      it('should reset value of error last name', () => {
        const data: string = "lName";

        component.checkInput(data);

        expect(component.error.errorFirstName.length).toEqual(0);
        expect(component.error.errorFirstName).toEqual(jasmine.any(String));
      });

      it('should reset value of error email', () => {
        const data: string = "email";

        component.checkInput(data);

        expect(component.error.errorFirstName.length).toEqual(0);
        expect(component.error.errorFirstName).toEqual(jasmine.any(String));
      });

      it('should reset value of error username', () => {
        const data: string = "username";

        component.checkInput(data);

        expect(component.error.errorFirstName.length).toEqual(0);
        expect(component.error.errorFirstName).toEqual(jasmine.any(String));
      });

      it('should reset value of error password', () => {
        const data: string = "password";

        component.checkInput(data);

        expect(component.error.errorFirstName.length).toEqual(0);
        expect(component.error.errorFirstName).toEqual(jasmine.any(String));
      });
    });
  });
  // --- End Check Input Method

  it('#toggleShowPassword should inverse the value of showPassword boolean', () => {
    component.showPassword = true;

    component.toggleShowPassword();

    expect(component.showPassword).toBeFalse();
  });

  it('#toggleShowConfirmPassword should inverse the value of showPassword boolean', () => {
    component.showConfirmPassword = false;

    component.toggleShowConfirmPassword();

    expect(component.showConfirmPassword).toBeTrue();
  });

});
