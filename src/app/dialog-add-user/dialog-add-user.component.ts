import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from '../users.service';
import { addDoc, updateDoc } from 'firebase/firestore';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss'],
})
export class DialogAddUserComponent {
  data = {
    firstname: '',
    lastname: '',
    birthday: undefined,
    male: true,
    female: false,
    zipcode: '',
    adress: '',
    city: '',
    email: '',
    id: ''
  };

  constructor(private dialog: MatDialog, private usersService: UsersService) {}

  onNoClick() {
    this.dialog.closeAll();
  }

  async submitData() {
    const docRef = await addDoc(this.usersService.collection, this.data);
    
    await updateDoc(docRef, { id: docRef.id });

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
