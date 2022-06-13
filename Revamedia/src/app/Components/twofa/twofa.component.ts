import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from 'src/app/Shared/services/auth-service/authentication.service';

@Component({
  selector: 'app-twofa',
  templateUrl: './twofa.component.html',
  styleUrls: ['./twofa.component.scss']
})
export class TwofaComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  loginWithTwoFactor(twoFactorForm: NgForm){
      this.authService.loginWithTwoFactor(twoFactorForm);
  }

}
