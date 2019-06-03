import { Component, OnInit } from '@angular/core';
import { ZBar, ZBarOptions } from '@ionic-native/zbar/ngx';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.page.html',
  styleUrls: ['./qr-code.page.scss'],
})
export class QrCodePage implements OnInit {
  qrData = null;
  createdCode = null;
  scannedCode = null;
  constructor(private zbar: ZBar) { }

  ngOnInit() {
  }
  createCode(){
    this.createdCode = this.qrData;
  }
  scanCode(){    
    let options: ZBarOptions = {
      text_title:"Código QR",
      text_instructions: "Por favor apunte su cámara al código QR",
      flash: 'off',
      drawSight: false
    }

    this.zbar.scan(options)
    .then(result => {
        console.log(result); // Scanned code
        this.scannedCode=result;
    })
    .catch(error => {
        console.log(error); // Error message
    });
  }
}
