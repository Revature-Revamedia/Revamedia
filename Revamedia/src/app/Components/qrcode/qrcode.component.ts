import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { QrcodeService } from 'src/app/Shared/services/qrcode-service/qrcode.service';
import { Buffer } from 'buffer';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.scss']
})
export class QrcodeComponent implements OnInit {

  image: any = ""

  constructor(private qrcodeService: QrcodeService, private sanitizer: DomSanitizer ) { }
  ngOnInit(): void {}

  enableTwoFactorAuth(){
    this.qrcodeService.enableTwoFactorAuth().subscribe((data: any) =>{this.image = data;});
  }
  disableTwoFactorAuth(){
    this.qrcodeService.disableTwoFactorAuth().subscribe((data: any) => {console.log(data)});
  }
  recreateQRCode(){
    this.qrcodeService.recreateQRCode().subscribe((data:any) => {console.log(data)});
  }

}
