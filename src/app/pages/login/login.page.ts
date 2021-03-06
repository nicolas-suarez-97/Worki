import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UserI } from '../../models/user.interface';
import { UsersService } from '../../services/users.service';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  imgUrl = "assets/Logo.png";
  user:string = "";
  pws: string = "";
  users: UserI[];
  subscription=null;
  constructor(
    private router: Router, 
    private userService:UsersService,     
    private loadingController: LoadingController,
    private toastController: ToastController
    ) {}

  ngOnInit() {   
    this.loadData();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  async loadData(){
    this.subscription = this.userService.getUsers().subscribe(res => {
      this.users = res;
      console.log(res);
    });  
  }

  async login(){  
    const loading = await this.loadingController.create({
      message: 'Ingresando...',
      duration: 1000
    });
    await loading.present();   
    
    var userExist = false;
    var pass = false;
    for(let u of this.users){
      
      if(this.user == u.name){
        userExist = true;
        if(this.pws == u.password){
          pass=true;          
          loading.dismiss();
          if(u.type=="admin"){
            console.log("admin");
            this.subscription.unsubscribe();
            this.routeAdminPage(u.id);
          }else{
            if(u.type=="coordinator"){
              this.subscription.unsubscribe();
              this.routeCoordinatorPage(u.id);
            }else{              
              this.subscription.unsubscribe();
              this.routeHomePage(u.id);
            }
          }          
        }                  
      }              
    }
    if(!userExist){
      loading.dismiss();
      this.presentToast("Parece que no existe este usuario");      
    }else{
      if(!pass){
        loading.dismiss();
        this.presentToast("Contraseña incorrecta");        
      }
    }
    loading.dismiss();
  }

  routeHomePage(userId:string){
    this.router.navigate([`/home`,{id:userId}]); 
  }
  
  routeAdminPage(userId:string){
    this.router.navigate([`/admin`,{id:userId}]); 
  }

  routeCoordinatorPage(userId:string){
    this.router.navigate([`/coordinator`,{id:userId}]); 
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

}
