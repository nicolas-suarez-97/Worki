import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  imgUrl: string ="assets/logo2.png";
  constructor(
    private router: Router,     
    private userService: UsersService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
  }

  logOut(){
    this.router.navigateByUrl(`/login`); 
  }

}
