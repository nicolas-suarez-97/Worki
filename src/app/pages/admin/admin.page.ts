import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { EventsService } from 'src/app/services/events.service';
import { EventI } from 'src/app/models/event.interface';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit, OnDestroy {
  imgUrl: string ="assets/logo2.png";
  userId = null;
  events: EventI[];
  subscription=null;
  constructor(
    private router: Router,         
    private route: ActivatedRoute,
    private eventService:EventsService
  ) { 
    
  }

  ngOnInit() {
    this.userId = this.route.snapshot.params['id']; 
    console.log(this.userId);
    if(this.userId && this.userId != "undefined"){
      this.subscription = this.eventService.getEventByVar("admin",this.userId).subscribe(res => {
        this.events = res
      });  
    }else{
      this.router.navigateByUrl(`/login`); 
    }
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  loadData(){
    this.userId = this.route.snapshot.params['id']; 
    console.log(this.userId);
    if(this.userId && this.userId != "undefined"){
      this.subscription = this.eventService.getEventByVar("admin",this.userId).subscribe(res => {
        this.events = res
      });  
    }else{
      this.router.navigateByUrl(`/login`); 
    }
  }
  logOut(){
    //this.subscription.unsubscribe();
    this.router.navigateByUrl(`/login`); 
  }

  routeAddEventPage(){    
    this.router.navigate([`/add-event`,{id:this.userId}]); 
  }

  editEvent(eventId:string){    
    this.router.navigate([`/edit-event`,{eventId:eventId,userId:this.userId}]); 
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.loadData();
    console.log(this.events);
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
}
