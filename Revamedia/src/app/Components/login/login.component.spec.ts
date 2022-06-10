import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgForm, FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { AuthenticationService } from 'src/app/Shared/services/auth-service/authentication.service';
import { anything, instance, mock, verify, when, } from "ts-mockito"



describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthService: AuthenticationService = mock(AuthenticationService);
  let auth = instance(mockAuthService);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [LoginComponent],
      providers: [{ provide: AuthenticationService, useValue: auth }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('AuthenticationService.login should be called', () => {
    const testForm = <NgForm>{
      value: {
        username: "shady",
        password: "Password1!"
      }
    };
    component.logIn(testForm);
    spyOn(component, 'logIn').call(component.logIn, testForm);
    expect(component.logIn).toHaveBeenCalledTimes(1);
    verify(auth.login(testForm)).once;
    expect(auth.login).toHaveBeenCalled;
  });


  it('toggleShowPassword() should flip the value of showPassword', () => {
    let StoreVal = false;
    component.showPassword = false;
    component.toggleShowPassword();
    expect(component.showPassword).not.toEqual(StoreVal);
  })


});
