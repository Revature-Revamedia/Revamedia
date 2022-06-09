import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { NgForm } from '@angular/forms';
import { of } from 'rxjs';

import { ResetService } from './reset.service';

describe('ResetService', () => {
  let service: ResetService;
  let resetUrl: string;
  let httpClientSpy: {
    post: jasmine.Spy
  }

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj("HttpClient", ['post']);

    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: httpClientSpy }
      ]
    });
    service = TestBed.inject(ResetService);
    resetUrl = service.resetUrl;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('resetPassword should make a post request to proper url', () => {
    httpClientSpy.post.and.returnValue(of({}));
    const resetForm = { value: {
      username: "Johnny44",
      password: "SecretPassword"
    }} as NgForm;

    service.resetPassword(resetForm);

    expect(httpClientSpy.post).toHaveBeenCalledWith(
      resetUrl,
      { username: "Johnny44", password: "SecretPassword" },
      { headers: jasmine.any(HttpHeaders), withCredentials: true }
    )
  });
});
