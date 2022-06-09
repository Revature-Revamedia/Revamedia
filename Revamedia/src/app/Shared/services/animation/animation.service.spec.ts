import { TestBed } from '@angular/core/testing';
import gsap from 'gsap';

import { AnimationService } from './animation.service';

describe('AnimationService', () => {
  let service: AnimationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnimationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('fadeIn should call gsap.from with appropriate arguments', () => {
    // Arrange
    const element = {} as HTMLElement;
    const duration: number = 1000;
    const opacity: number = .4;
    const delay: number = 100;
    spyOn(gsap, 'from');

    // Act
    service.fadeIn(element, duration, opacity, delay);

    // Assert
    expect(gsap.from).toHaveBeenCalled();
  });
});
