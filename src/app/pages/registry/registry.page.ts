import { Component, OnInit } from '@angular/core';
import { UserI } from '../../models/user.interface';
import { UsersService } from '../../services/users.service';
import { LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.page.html',
  styleUrls: ['./registry.page.scss'],
})
export class RegistryPage implements OnInit {

  imgUrl:string = "assets/Logo.png";
  user: UserI = {
    name: "",
    password: "",
    document: "",
    cellphone: ""
  }
  constructor(private userService: UsersService, private nav:NavController,private loadingController: LoadingController) { }

  ngOnInit() {
  }

  async register(){
    const loading = await this.loadingController.create({
      message: 'Guardando...'
    });
    if(this.user.name!="" && this.user.password!=""){
      await loading.present();
      this.userService.addUser(this.user).then(()=>{
        loading.dismiss();
        this.nav.navigateForward('/');
      });
    }
  }

}
