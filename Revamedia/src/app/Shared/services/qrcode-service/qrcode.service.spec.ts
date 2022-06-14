import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';

import { QrcodeService } from './qrcode.service';

describe('QrcodeService', () => {
  let service: QrcodeService;

  let httpClientSpy: { post: jasmine.Spy};
  let sanitizerSpy: {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: DomSanitizer, useValue: sanitizerSpy },
      ]
    });
    service = TestBed.inject(QrcodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
