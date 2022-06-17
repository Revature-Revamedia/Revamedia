import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfanityFilterService {

  constructor() { }

  public BADWORDS: string[] = ["ass", "asshole", "arse", "bitch", "bullshit", "crap", "cunt", "cocksucker", "fuck", "motherfucker", "nigga", "nigger", "shit", "slut"];
  public isValid: boolean = false;
  public validate(sentence: string){
    var words = sentence.split(" ");
    words.forEach((word) => {
      if(word.includes("ass")){
        this.isValid == this.isValid;
      }else{
        this.isValid == !this.isValid;
      }
    })
  }
}
