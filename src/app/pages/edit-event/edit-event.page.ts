import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from 'src/app/services/events.service';
import { EventI } from 'src/app/models/event.interface';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { UserI } from 'src/app/models/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.page.html',
  styleUrls: ['./edit-event.page.scss'],
})
export class EditEventPage implements OnInit, OnDestroy {
  eventId = null;
  userId=null;
  subs=null;  
  quantity:number = 0;
  coordinators: UserI[];
  event: EventI = {
    date: null,
    ubication: "",
    admin: "",
    coordinatorId:"",
    coordinatorName:"",
    providers: [],
    number: 0,
    name:""
  }  
  constructor(
    private route:ActivatedRoute,
    private eventService: EventsService,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private router: Router,
    private alertController: AlertController,
    private userService: UsersService
  ) {         
  }

  ngOnInit() {
    this.eventId = this.route.snapshot.params['eventId']; 
    this.userId = this.route.snapshot.params['userId']; 
    if(this.userId && this.userId !="undefined"){      
      this.loadData();      
      this.eventService.getEvent(this.eventId).subscribe(res => {
        this.event = res;
        this.quantity = this.event.providers.length;     
      });
      
    }else{
      this.router.navigate([`/login`]); 
    }    
  }
  
  ngOnDestroy(){
    this.subs.unsubscribe();    
  }

  async loadData(){     
    console.log("Cargando lista");
    const loading = await this.loadingController.create({
      message: 'Gargando.....',
      duration: 2000
    });       
    await loading.present();      
    //Agregar empresa del usuario!!!!
    this.subs = this.userService.getCoordinators("worki").subscribe(res => {     
      loading.dismiss(); 
      console.log(res);
      this.coordinators = res;
      
    });  
  }

  async updateEvent(){
    const loading = await this.loadingController.create({
      message: 'Guardando...',
      duration:3000
    });
    await loading.present();
    this.subs.unsubscribe();
    this.userService.getUser(this.event.coordinatorId).subscribe(res => {
      this.event.coordinatorName = res.name;      
      
      this.eventService.updateEvent(this.event,this.eventId).then(()=>{      
        loading.dismiss();
        this.router.navigate([`/admin`,{id:this.userId}]); 
        this.presentToast("Datos Guardados");
      });       
    });    

  }


  async onRemoveEvent(){
    
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: '<strong>¿Esta seguro que desea eliminar su cuenta?</strong>!!!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
            this.eventService.deleteEvent(this.eventId);
            this.router.navigate([`/admin`,{id:this.userId}]); 
          }
        }
      ]
    });  
    await alert.present();    
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
        this.updateEventUser(this.event);
        break;
      }
    }
    console.log(this.event.providers);
  }

  async updateEventUser(event:EventI){    
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

  disabled(){
    if(this.event.providers.length>0){
      return true;
    }else{
      return false;
    }
  }
}
