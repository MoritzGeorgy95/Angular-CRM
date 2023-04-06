import { Component } from '@angular/core';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component'; 
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(private dialog: MatDialog) {
  }


  openDialog() {
    const dialogRef=  this.dialog.open(DialogAddUserComponent, {})
   
    dialogRef.afterClosed().subscribe((result) => console.log(result));
  }
}
