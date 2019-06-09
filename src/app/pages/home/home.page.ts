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
  imgUrl: string ="assets/logo2.png";
  users: UserI[];
  userId=null;
  createdCode = null;
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
    private loadingController:LoadingController
    )
    {}

  ngOnInit(){     
    this.userId = this.route.snapshot.params['id']; 
    if(this.userId){
      this.loadUser();
      this.createQR();
    }
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

  createQR(){
    this.createdCode = this.userId;
  }

  pushQr(){      
    this.router.navigateByUrl(`/qr-code`); 
  }

  modifyInfo(){
    this.router.navigate([`/edit-profile`,{id:this.userId}]); 
  }

  logOut(){
    this.router.navigateByUrl(`/login`); 
  }

  qrCode(){
    if(this.userId){
      this.router.navigate([`/qr-code`,{id:this.userId}]); 
    }
  }
}
 