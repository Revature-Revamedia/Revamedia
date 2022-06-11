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
  ngOnInit(): void {
    this.getQRCodeImage();
  }

  getQRCodeImage(){
    this.qrcodeService.getQRCodeImage().subscribe((data: any) => {
    //console.log(data.data);
    this.image = data;
    } 
    );
  }

}
