import { HttpClient, HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

import { GiphyService } from './giphy.service';

fdescribe('GiphyService', () => {
  let service: GiphyService;
  let apiBaseUrl: string;
  const search: string = "buffalo";
  let httpClientSpy: {
    get: jasmine.Spy
  };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj("HttpClient", ['get']);
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: httpClientSpy }
      ]
    });
    service = TestBed.inject(GiphyService);
    apiBaseUrl = service['apiBaseUrl'];
    httpClientSpy.get.and.returnValue(of([]));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getGIFS should return http observable to proper url', () => {
    // Act
    const resultValue = service.getGIFS(search);
    // Assert
    expect(resultValue).toBeInstanceOf(Observable);
    expect(httpClientSpy.get).toHaveBeenCalledOnceWith(apiBaseUrl + "gifs/search?q=" + search + "&api_key=" + environment.apiKey + "&limit=24");
  });

  it('getStickers should return http observable to proper url', () => {
    // Act
    const resultValue = service.getStickers(search);

    // Assert
    expect(resultValue).toBeInstanceOf(Observable);
    expect(httpClientSpy.get).toHaveBeenCalledOnceWith(apiBaseUrl + "stickers/search?q=" + search + "&api_key=" + environment.apiKey + "&limit=12&lang=en");
  });
});
