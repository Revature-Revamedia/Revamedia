import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ForgotService } from 'src/app/Shared/services/forgot-service/forgot.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {

  constructor(private forgotService : ForgotService) { }

  ngOnInit(): void {
  }

  sendEmail(sendEmailForm: NgForm){
      this.forgotService.sendEmail(sendEmailForm);
  }

}
