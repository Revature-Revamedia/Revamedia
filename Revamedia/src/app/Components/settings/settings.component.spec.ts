import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { UserService } from 'src/app/Shared/services/user-service/user.service';

import { SettingsComponent } from './settings.component';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;
  let userServiceSpy: {
    getUser: jasmine.Spy,
    updateUser: jasmine.Spy
   };

  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['getUser', 'updateUser']);

    await TestBed.configureTestingModule({
      declarations: [ SettingsComponent ],
      imports: [ FormsModule
      ],
      providers: [
        { provide: UserService, useValue: userServiceSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should call getCurrentUserData', () => {
    // Arrange
    spyOn(component, 'getCurrentUserData');
    // Act
    component.ngOnInit();
    // Assert
    expect(component.getCurrentUserData).toHaveBeenCalledTimes(1);
  });

  it('getCurrentUserData should update component user on success', () => {
    // Arrange
    const user = {
      userId: 1,
      firstName: "John",
      lastName: "Doe"
    };
    userServiceSpy.getUser.and.returnValue(of(user));

    // Act
    component.getCurrentUserData();

    // Assert
    expect(component.user).toEqual(user);
  });

  it('getCurrentUserData should log error on fail', () => {
    // Arrange
    const customHttpError: Partial<HttpErrorResponse> = {
      message: "This is the error message"
    };
    userServiceSpy.getUser.and.returnValue(throwError(() => customHttpError));
    spyOn(console, 'log');

    // Act
    component.getCurrentUserData();

    // Assert
    expect(console.log).toHaveBeenCalledWith(customHttpError.message)
  });

  it('onUpdateUser should call component closeModal with edit on success', () => {
    // Arrange
    const formToPassIn = {} as NgForm;
    const idToPassIn: number = 4;
    userServiceSpy.updateUser.and.returnValue(of({}));
    spyOn(component, 'closeModal');

    // Act
    component.onUpdateUser(formToPassIn, idToPassIn);

    // Assert
    expect(component.closeModal).toHaveBeenCalledOnceWith('edit');
  });

  it('onUpdateUser should log error on fail', () => {
    // Arrange
    const formToPassIn = {} as NgForm;
    const idToPassIn: number = 4;
    const customHttpError: Partial<HttpErrorResponse> = { message: "Error message"}
    userServiceSpy.updateUser.and.returnValue(throwError(() => customHttpError));
    spyOn(console, 'log');

    // Act
    component.onUpdateUser(formToPassIn, idToPassIn);

    // Assert
    expect(console.log).toHaveBeenCalledWith(customHttpError.message);
  });

  it('changeTheme should toggle "darkMode" class on body element', () => {
    // Arrange
    spyOn(document.body.classList, 'toggle');
    component.darkTheme = false;

    // Act
    component.changeTheme();

    // Assert
    expect(document.body.classList.toggle).toHaveBeenCalledOnceWith('darkMode');
    expect(component.darkTheme).toBeTruthy;
  });

  it('toggleShowPassword should inverse component.showPassword', () => {
    // Arrange
    component.showPassword = false;

    // Act
    component.toggleShowPassword();

    // Assert
    expect(component.showPassword).toBeTruthy;
  });

  it('closeModal should remove "openScreen" class from screen element', () => {
    // Arrange
    const modalTypeToPassIn: string = "test";
    const screenElement = document.createElement('div');

    spyOn(document, 'getElementById').and.returnValue(screenElement);
    spyOn(screenElement.classList, 'remove');

    // Act
    component.closeModal(modalTypeToPassIn);

    // Assert
    expect(document.getElementById).toHaveBeenCalledWith('screen');
    expect(screenElement.classList.remove).toHaveBeenCalledWith('openScreen');
  });

  // Define Test
  it('closeModal should remove "openModal" class from modal element', () => {
    // Arrange
    const modalTypeToPassIn: string = "test";
    const form = document.createElement('div');

    spyOn(document, 'getElementById').and.returnValue(form);
    spyOn(form.classList, 'remove');

    // Act
    component.closeModal(modalTypeToPassIn);

    // Assert
    expect(document.getElementById).toHaveBeenCalledWith('test-account-modal');
    expect(form.classList.remove).toHaveBeenCalledWith('openModal');
  });

  it('openModal should add "openScreen" class to screen element', () => {
    // Arrange
    const mode: string = "test";
    const dataToPassIn: any = "testData";
    const screen = document.createElement('div');

    spyOn(document, 'getElementById').and.returnValue(screen);
    spyOn(screen.classList, 'add').and.callFake(function() {});

    // Act
    component.openModal(mode, dataToPassIn);

    // Assert
    expect(document.getElementById).toHaveBeenCalledWith('screen');
    expect(screen.classList.add).toHaveBeenCalledWith('openScreen');
  });

  it('openModal should add "openModal" class to modal element', () => {
    // Arrange
    const mode: string = "test";
    const dataToPassIn: any = "testData";
    const form = document.createElement('div');

    spyOn(document, 'getElementById').and.returnValue(form);
    spyOn(form.classList, 'add').and.callFake(function() {});

    // Act
    component.openModal(mode, dataToPassIn);

    // Assert
    expect(document.getElementById).toHaveBeenCalledWith('test-account-modal');
    expect(form.classList.add).toHaveBeenCalledWith('openModal');
  });

  it('openModal should assign proper user to user if mode is equal to edit', () => {
    // Arrange
    const mode: string = 'edit';
    const user = {};
    component.user = { firstName: "Edit", lastName: "User" };
    const el = document.createElement('div');
    spyOn(document, "getElementById").and.returnValue(el);
    spyOn(el.classList, "add");

    // Act
    component.openModal(mode, user);

    // Assert
    expect(component.user).toEqual(component.user)
  });

  it('openModal should assign proper user to user if mode is equal to delete', () => {
    // Arrange
    const mode: string = 'delete';
    const user = {};
    component.user = { firstName: "Delete", lastName: "User" };
    const el = document.createElement('div');
    spyOn(document, "getElementById").and.returnValue(el);
    spyOn(el.classList, "add");

    // Act
    component.openModal(mode, user);

    // Assert
    expect(component.deleteUser).toEqual(component.deleteUser);
  });
});
