import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from '../users.service';
import { addDoc } from 'firebase/firestore';

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
    zipcode: '',
    adress: '',
    city: ''
  } 

  constructor(private dialog: MatDialog, private usersService: UsersService) {

  }

  onNoClick() {
    this.dialog.closeAll();
  }

  async submitData() {
    
    await addDoc(this.usersService.collection, this.data);
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
