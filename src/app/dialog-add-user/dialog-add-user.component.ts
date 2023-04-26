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
    birthday: null,
    male: true,
    female: false,
    zipcode: '',
    adress: '',
    city: '',
    email: '',
    id: '',
    company: '',
    website: ''
  };

  customImage: File | null; 

  constructor(private dialog: MatDialog, private usersService: UsersService) {}

  onNoClick() {
    this.dialog.closeAll();
  }

  async submitData() {
    const docRef = await addDoc(this.usersService.collection, this.data);
    
    let id= docRef.id
    
    await updateDoc(docRef, { id: id });

    if (this.customImage) {
      await this.usersService.uploadImage(this.customImage, id);
    }

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

  onFileSelected(event: any) {
    const file= event.target.files[0];
    if (file) {
      this.customImage = file;
    }
  }

  resetCustomImage() {
    this.customImage= null;
  }
}
