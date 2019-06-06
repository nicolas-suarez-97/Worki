import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { ZBar, ZBarOptions } from '@ionic-native/zbar/ngx';

@Component({
  selector: 'app-coordinator',
  templateUrl: './coordinator.page.html',
  styleUrls: ['./coordinator.page.scss'],
})
export class CoordinatorPage implements OnInit {
  imgUrl: string ="assets/logo2.png";
  scannedCode = null;
  constructor(
    private router: Router,     
    private userService: UsersService,
    private route: ActivatedRoute,
    private zbar: ZBar
  ) { }

  ngOnInit() {
  }

  logOut(){
    this.router.navigateByUrl(`/login`); 
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
    })
    .catch(error => {
        console.log(error); // Error message
    });
    
  }
  pushQr(){      
    this.router.navigateByUrl(`/qr-code`); 
  }
}
