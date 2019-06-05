import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserI } from '../../models/user.interface';
import { UsersService } from '../../services/users.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  users: UserI[];
  userId=null;
  user: UserI = {
    name: "",
    document: "",
    cellphone: "",
    password:""
  };
  constructor(
    private router: Router,     
    private userService: UsersService,
    private route: ActivatedRoute,
    private loadingController:LoadingController,  
    )
    {               
      this.userId = this.route.snapshot.params['id']; 
      if(this.userId){
        this.loadUser();
      }
  }

  ngOnInit(){     
  }
  
  async loadUser(){      
    const loading = await this.loadingController.create({
      message: 'Loading.....'
    });
    this.userService.getUsers().subscribe(res => {
      this.users = res;
      console.log(this.users);
    });      
    await loading.present();      
    this.userService.getUser(this.userId).subscribe(res => {     
      loading.dismiss(); 
      console.log(res);
      this.user = res;
    })
    console.log(this.user.name);
  }

  pushQr(){      
    this.router.navigateByUrl(`/qr-code`); 
  }

  qrCode(){
    if(this.userId){
      this.router.navigate([`/qr-code`,{id:this.userId}]); 
    }
  }
}
 