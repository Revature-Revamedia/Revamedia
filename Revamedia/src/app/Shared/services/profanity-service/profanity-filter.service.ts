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
    console.log(words)
  }
}
