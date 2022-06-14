import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from 'src/app/Shared/services/auth-service/authentication.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-twofa',
  templateUrl: './twofa.component.html',
  styleUrls: ['./twofa.component.scss']
})
export class TwofaComponent implements OnInit {

  constructor(private authService: AuthenticationService, private location: Location) { }

  ngOnInit(): void {
  }

  loginWithTwoFactor(twoFactorForm: NgForm){
      let userData: any = this.location.getState();
      console.log("component ",userData);
      this.authService.loginWithTwoFactor(userData, twoFactorForm);
  }

}
