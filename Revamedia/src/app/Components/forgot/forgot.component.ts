import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ForgotService } from 'src/app/Shared/services/forgot-service/forgot.service';
import { faEnvelope, faHouseChimney } from '@fortawesome/free-solid-svg-icons';
import { AnimationService } from 'src/app/Shared/services/animation/animation.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {

  constructor(private forgotService : ForgotService, public animationService: AnimationService) { }

  ngOnInit(): void {
  }

  public faEnvelope = faEnvelope;
  public faHouseChimney = faHouseChimney;
  sendEmail(sendEmailForm: NgForm){
      this.forgotService.sendEmail(sendEmailForm);
      const notification = document.getElementById('notification') as HTMLElement;
      notification.classList.add('showNotification');
  }
}
