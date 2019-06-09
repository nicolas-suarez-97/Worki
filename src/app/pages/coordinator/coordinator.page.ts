import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { EventsService } from 'src/app/services/events.service';
import { EventI } from 'src/app/models/event.interface';

@Component({
  selector: 'app-coordinator',
  templateUrl: './coordinator.page.html',
  styleUrls: ['./coordinator.page.scss'],
})
export class CoordinatorPage implements OnInit, OnDestroy {
  imgUrl: string ="assets/logo2.png";  
  subscription = null;
  userId = null;
  events: EventI[];
  constructor(
    private router: Router,     
    private userService: UsersService,
    private eventService: EventsService,
    private route: ActivatedRoute    
  ) { }

  ngOnInit() {
    this.userId = this.route.snapshot.params['id']; 
    console.log(this.userId);
    if(this.userId && this.userId != "undefined"){
      this.subscription = this.eventService.getEventByVar("coordinatorId",this.userId).subscribe(res => {
        this.events = res
        console.log(this.events);
      });  
    }else{
      this.router.navigateByUrl(`/login`); 
    }
  }

  loadData(){
    this.userId = this.route.snapshot.params['id']; 
    console.log(this.userId);
    if(this.userId && this.userId != "undefined"){
      this.subscription = this.eventService.getEventByVar("coordinatorId",this.userId).subscribe(res => {
        this.events = res
        console.log(this.events);
      });  
    }else{
      this.router.navigateByUrl(`/login`); 
    }
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  logOut(){
    this.router.navigateByUrl(`/login`); 
  }

  mainEvent(eventId:string){
    this.router.navigate([`/main-event-page`,{eventId:eventId,userId:this.userId}]); 
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
