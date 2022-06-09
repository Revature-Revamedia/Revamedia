import { Injectable } from '@angular/core';
import { gsap } from 'gsap';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {

  constructor() { }
  public fadeIn(e: any, tym: any, alfa: any, dlay: any) {
    gsap.from(e, { duration: tym, opacity: alfa, delay: dlay });
  }

  public slideIn(e: any) {
    gsap.from(e, { x: '-100%' });
    gsap.to(e, { duration: 0.5, x: '0%', delay: 0 });
  }
}
