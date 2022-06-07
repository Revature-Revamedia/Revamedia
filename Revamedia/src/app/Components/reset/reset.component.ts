import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ResetService } from 'src/app/Shared/services/reset-service/reset.service';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {

  constructor(private resetService: ResetService) { }

  ngOnInit(): void {
  }

  public resetPassword(resetForm: NgForm) {
    this.resetService.resetPassword(resetForm);
  }

  // Front End Work
  public faEye = faEye; //icon
  public faEyeSlash = faEyeSlash; // icons

  // Show Password
  public showPassword = false;
  public toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
}
