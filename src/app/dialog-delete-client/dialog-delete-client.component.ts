import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from '../users.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-dialog-delete-client',
  templateUrl: './dialog-delete-client.component.html',
  styleUrls: ['./dialog-delete-client.component.scss']
})
export class DialogDeleteClientComponent {

  constructor(private dialog: MatDialog, private usersService: UsersService, private location: Location) {

  }

  onNoClick() {
    this.dialog.closeAll();
  }

  async deleteClientAccount() {

  }

}
