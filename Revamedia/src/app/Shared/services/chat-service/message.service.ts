import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  SockJS : any ;
  Stomp: any;
  constructor() {
    this.initializeWebSocketConnection();
  }
  public stompClient: any;
  public msg : any [] = [];

  initializeWebSocketConnection() {
    const serverUrl = 'http://localhost:8081/socket';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, function(frame: any) {
      that.stompClient.subscribe('/message', (message: any) => {
        if (message.body) {
          that.msg.push(message.body);
        }
      });
    });
  }
  
  sendMessage(message: any) {
    this.stompClient.send('/app/send/message' , {}, message);
  }
}
