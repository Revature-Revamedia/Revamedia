import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ResetService } from 'src/app/Shared/services/reset-service/reset.service';

import { ResetComponent } from './reset.component';

describe('ResetComponent', () => {
  let component: ResetComponent;
  let fixture: ComponentFixture<ResetComponent>;
  let resetServiceSpy: { resetPassword: jasmine.Spy };
  let routerSpy: { navigateByUrl: jasmine.Spy };

  beforeEach(async () => {
    resetServiceSpy = jasmine.createSpyObj('ResetServiceSpy', ['resetPassword']);
    routerSpy = jasmine.createSpyObj('RouterSpy', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      imports: [ FormsModule ],
      providers: [
        { provide: ResetService, useValue: resetServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
      declarations: [ ResetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
