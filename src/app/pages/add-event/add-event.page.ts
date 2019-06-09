import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventI } from 'src/app/models/event.interface';
import { EventsService } from 'src/app/services/events.service';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { UserI } from 'src/app/models/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.page.html',
  styleUrls: ['./add-event.page.scss'],
})
export class AddEventPage implements OnInit, OnDestroy {
  userId = null;
  subscription = null;
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
  coordinators: UserI[];
  constructor(
    private eventService: EventsService, 
    private loadingController: LoadingController, 
    private route:ActivatedRoute, 
    private router: Router, 
    private userService: UsersService
  ) { 
    
  }

  ngOnInit() {
    this.userId = this.route.snapshot.params['id'];     
    if(this.userId != null && this.userId != "undefined"){                        
      console.log("Cargó add event" + this.userId);
      this.loadUsers();  
    }else{
      this.router.navigate([`/`]); 
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async loadUsers(){      
    const loading = await this.loadingController.create({
      message: 'Gargando.....',
      duration: 2000
    });       
    await loading.present();      
    console.log("getUsers");
    this.subscription = this.userService.getCoordinators("worki").subscribe(res => {      
      console.log(res);      
      loading.dismiss();
      this.coordinators = res;
    });     
  }

  async addEvent(){
    const loading = await this.loadingController.create({
      message: 'Guardando...',
      duration:3000
    });
   
    await loading.present();
    this.userService.getUser(this.event.coordinatorId).subscribe(res => {
      this.event.coordinatorName = res.name;
      this.event.admin = this.userId;
      
      this.eventService.addEvent(this.event).then(()=>{
        loading.dismiss();
        this.router.navigate([`/admin`,{id:this.userId}]); 
      });     
    });
  }

}
