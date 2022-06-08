import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/Shared/services/chat-service/message.service';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss']
})
export class ChatroomComponent {

  title = 'websocket-frontend';
  input: any;
  constructor(public messageService: MessageService) {}

  sendMessage() {
    if (this.input) {
      this.messageService.sendMessage(this.input);
      this.input = '';
    }
  }
}
