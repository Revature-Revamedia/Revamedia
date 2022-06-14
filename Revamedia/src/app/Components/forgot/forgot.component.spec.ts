import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AnimationService } from 'src/app/Shared/services/animation/animation.service';
import { ForgotService } from 'src/app/Shared/services/forgot-service/forgot.service';

import { ForgotComponent } from './forgot.component';

describe('ForgotComponent', () => {
  let component: ForgotComponent;
  let fixture: ComponentFixture<ForgotComponent>;
  let forgotServiceSpy: { sendEmail: jasmine.Spy };
  let animationServiceSpy: jasmine.SpyObj<any>;

  beforeEach(async () => {
    forgotServiceSpy = jasmine.createSpyObj('ForgotServicespy', ['sendEmail']);
    animationServiceSpy = jasmine.createSpyObj('AnimationServiceSpy', ['']);

    await TestBed.configureTestingModule({
      providers: [
        { provide: AnimationService, useValue: animationServiceSpy },
        { provide: ForgotService, useValue: forgotServiceSpy },
      ] ,
      imports: [ FormsModule ],
      declarations: [ ForgotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
