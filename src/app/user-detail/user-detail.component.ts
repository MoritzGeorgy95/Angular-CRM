import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {

  userData:any;
  url:any;

  constructor( private location: Location, private usersService: UsersService) {
    this.url = this.location.path().split('/')[2];
    this.usersService.getSingle(this.url).then(()=> {
      this.userData= this.usersService.currentUser;  
    });
  }

}
