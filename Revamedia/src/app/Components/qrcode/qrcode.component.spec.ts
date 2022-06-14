import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { QrcodeService } from 'src/app/Shared/services/qrcode-service/qrcode.service';

import { QrcodeComponent } from './qrcode.component';

describe('QrcodeComponent', () => {
  let component: QrcodeComponent;
  let fixture: ComponentFixture<QrcodeComponent>;

  let qrcodeServiceSpy: {
    enableTwoFactorAuth: jasmine.Spy,
    disableTwoFactorAuth: jasmine.Spy,
    recreateQRCode: jasmine.Spy
  };
  let santizerSpy: {};

  beforeEach(async () => {
    qrcodeServiceSpy = jasmine.createSpyObj('QrcodeServiceSpy', ['enableTwoFactorAuth', 'disableTwoFactorAuth', 'recreateQRCode']);

    await TestBed.configureTestingModule({
      declarations: [ QrcodeComponent ],
      providers: [
        { provide: QrcodeService, useValue: qrcodeServiceSpy },
        { provide: DomSanitizer, useValue: santizerSpy },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QrcodeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
