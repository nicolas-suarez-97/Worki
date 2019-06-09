import { Component, OnInit } from '@angular/core';
import { UserI } from 'src/app/models/user.interface';
import { UsersService } from 'src/app/services/users.service';
import { LoadingController, NavController, ToastController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  userId=null;  
  user: UserI = {
    name: "",
    document: "",
    cellphone: "",
    password:""
  };
  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private userService: UsersService,        
    private alertController:AlertController,
    private toastController:ToastController,
    private loadingController:LoadingController
  ) { }

  ngOnInit() {
    this.userId = this.route.snapshot.params['id']; 
    if(this.userId){
      this.loadUser();        
    }
  }

  async loadUser(){      
    const loading = await this.loadingController.create({
      message: 'Gargando.....'
    });       
    await loading.present();      
    this.userService.getUser(this.userId).subscribe(res => {     
      loading.dismiss(); 
      console.log(res);
      this.user = res;
    })
    console.log(this.user.name);    
  }

  async saveUser(){
    const loading = await this.loadingController.create({
      message: 'Guardando...',
      duration:3000
    });
    await loading.present();
    
    this.userService.updateUser(this.user,this.userId).then(()=>{
      this.router.navigate([`/home`,{id:this.userId}]); 
      loading.dismiss();
      this.presentToast("Datos Guardados");
    });  
  }

  async onRemove(){
    
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
              this.userService.deleteUser(this.userId);
              this.router.navigate([`/login`]); 
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
}
