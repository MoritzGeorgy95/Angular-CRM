import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss'],
})
export class DialogAddUserComponent {
  
  data= {
    firstname: '',
    lastname: '',
    birthday: undefined,
    male: true,
    female: false,
  } 

  constructor(private dialog: MatDialog) {
  }

  onNoClick() {
    this.dialog.closeAll();
  }

  toggleMale() {
    this.data.male = true;
    this.data.female = false;
  }

  toggleFemale() {
    this.data.male = false;
    this.data.female = true;
  }
 
}
