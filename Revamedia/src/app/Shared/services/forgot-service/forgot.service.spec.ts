import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { NgForm } from '@angular/forms';
import { of } from 'rxjs';

import { ForgotService } from './forgot.service';

describe('ForgotService', () => {
  let service: ForgotService;
  let sendEmailUrl: string;
  let httpClientSpy: {
    post: jasmine.Spy
  };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj("HttpClient", ['post']);
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: httpClientSpy }
      ]
    });
    service = TestBed.inject(ForgotService);
    sendEmailUrl = service.sendEmailUrl;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('sendEmail should send post request to correct url with required payload', () => {
    // Arrange
    const sendEmailForm = {
      value: {
        email: "myEmail@email.com"
      }
    } as NgForm;
    httpClientSpy.post.and.returnValue(of({}));

    // Act
    service.sendEmail(sendEmailForm);

    // Assert
    expect(httpClientSpy.post).toHaveBeenCalledOnceWith(
      sendEmailUrl,
      "myEmail@email.com",
      { headers: jasmine.any(HttpHeaders)}
    );
  });
});
