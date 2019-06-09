import { Component, OnInit, OnDestroy } from '@angular/core';
import { ZBar, ZBarOptions } from '@ionic-native/zbar/ngx';
import { EventI } from 'src/app/models/event.interface';
import { EventsService } from 'src/app/services/events.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { UserI } from 'src/app/models/user.interface';

@Component({
  selector: 'app-main-event-page',
  templateUrl: './main-event-page.page.html',
  styleUrls: ['./main-event-page.page.scss'],
})
export class MainEventPagePage implements OnInit, OnDestroy {
  scannedCode = null;
  userId = null;
  eventId = null;
  quantity:number = 0;
  event:EventI={
    admin: "",
    coordinatorId: "",
    coordinatorName: "",
    date: null,
    name: "",
    number: 0,
    providers: [],
    ubication: ""
  };
  user: UserI={
    id:"",
    cellphone:"",
    document:"",
    name:"",
    password:""
  };
  subscription=null;
  constructor(
    private zbar: ZBar,
    private eventService: EventsService,
    private userService: UsersService,
    private route: ActivatedRoute,
    private router: Router    ,
    private loadingController: LoadingController,    
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.userId = this.route.snapshot.params['userId']; 
    this.eventId = this.route.snapshot.params['eventId']; 
    console.log(this.userId);
    if(this.userId && this.userId != "undefined"){
      this.loadData();      
    }else{
      this.router.navigateByUrl(`/login`); 
    }
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  async loadData(){
    const loading = await this.loadingController.create({
      message: 'Gargando.....',
      duration:2000      
    });       
    await loading.present();   
    this.subscription = this.eventService.getEvent(this.eventId).subscribe(res => {
      loading.dismiss();
      this.event = res; 
      this.quantity = this.event.providers.length;     
    });  
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
      this.user = res;           
      this.user.id = Code;  
      this.user.password = "";
      this.event.providers.push(this.user);
      this.updateEvent(this.event);
    });

  }
  
  async updateEvent(event:EventI){    
    const loading = await this.loadingController.create({
      message: 'Guardando...',
      duration:2000
    });
    await loading.present();
    
    this.eventService.updateEvent(event,this.eventId).then(()=>{      
      loading.dismiss();
      this.presentToast("Datos Guardados");
    });  
  }
  

  async presentToast(message:string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: "top",
      showCloseButton: true
    });
    toast.present();
  }

  onRemoveUser(id:string){
    for(var i=0; i< this.event.providers.length; i++){
      if(id == this.event.providers[i].id){        
        this.event.providers.splice(i,1);
        this.updateEvent(this.event);
        break;
      }
    }
    console.log(this.event.providers);
  }
}
