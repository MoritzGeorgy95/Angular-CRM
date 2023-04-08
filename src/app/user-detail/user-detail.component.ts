import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { UsersService } from '../users.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditDataComponent } from '../dialog-edit-data/dialog-edit-data.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {

  userData:any;
  url:any;
  panelOpenState = false;
  
  constructor( private location: Location, private usersService: UsersService, private dialog: MatDialog) {
    this.url = this.location.path().split('/')[2];
    this.usersService.getSingle(this.url).then(()=> {
      this.userData= this.usersService.currentUser;  
    });
  }

  editDataDialog(data:any) {
    this.dialog.open(DialogEditDataComponent, {
      data: {data}
    });
  }

}
