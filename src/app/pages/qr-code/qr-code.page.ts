import { Component, OnInit } from '@angular/core';
import { ZBar, ZBarOptions } from '@ionic-native/zbar/ngx';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { UserI } from 'src/app/models/user.interface';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.page.html',
  styleUrls: ['./qr-code.page.scss'],
})
export class QrCodePage implements OnInit {
  qrData = null;
  createdCode = null;
  scannedCode = null;
  userId=null;
  user: UserI = {
    name: "",
    document: "",
    cellphone: "",
    password:""
  };
  constructor(private zbar: ZBar, private route: ActivatedRoute, private userService: UsersService, private loadingController:LoadingController) { 
    this.userId = this.route.snapshot.params['id']; 
    if(this.userId){
      this.createQR();
    }
  }
  
  ngOnInit() {
  }

  createQR(){
    this.createdCode = this.userId;
  }

  createCode(){
    this.createdCode = this.qrData;
  }
  scanCode(){    
    console.log("QR Scanner");
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
        this.loadUser(this.scannedCode);
    })
    .catch(error => {
        console.log(error); // Error message
    });
  }

  async loadUser(Code:string){      
    const loading = await this.loadingController.create({
      message: 'Cargando Usuario.....',
      duration:3000
    });      
    await loading.present();      
    this.userService.getUser(Code).subscribe(res => {     
      loading.dismiss(); 
      console.log(res);
      this.user = res;
    })    
  }

  
}
