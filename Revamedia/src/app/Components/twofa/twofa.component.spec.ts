import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from 'src/app/Shared/services/auth-service/authentication.service';

import { TwofaComponent } from './twofa.component';

describe('TwofaComponent', () => {
  let component: TwofaComponent;
  let fixture: ComponentFixture<TwofaComponent>;

  let authServiceSpy: { loginWithTwoFactor: jasmine.Spy };
  let locationSpy: { getState: jasmine.Spy };

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthenticationServiceSpy', ['loginWithTwoFactor']);
    locationSpy = jasmine.createSpyObj('LocationSpy', ['getState']);

    await TestBed.configureTestingModule({
      declarations: [ TwofaComponent ],
      providers: [
        { provide: AuthenticationService, useValue: authServiceSpy },
        { provide: Location, useValue: locationSpy },
      ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TwofaComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
