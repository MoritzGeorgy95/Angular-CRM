import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from '../users.service';
import { addDoc, updateDoc } from 'firebase/firestore';
import { HotToastService } from '@ngneat/hot-toast';

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
    website: '',
    projects: {},
  };

  customImage: File | null;

  constructor(
    private dialog: MatDialog,
    private usersService: UsersService,
    private toast: HotToastService
  ) {}

  onNoClick() {
    this.dialog.closeAll();
  }

  async submitData() {
    if (this.formValidator()) {
      const docRef = await addDoc(this.usersService.collection, this.data);

      let id = docRef.id;

      await updateDoc(docRef, { id: id });

      if (this.customImage) {
        await this.usersService.uploadImage(this.customImage, id);
      }

      this.dialog.closeAll();
    } else {
      this.toast.error(
        'Please complete form with valid data! All fields need to contain a value.'
      );
    }
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
    const file = event.target.files[0];
    if (file) {
      this.customImage = file;
    }
  }

  resetCustomImage() {
    this.customImage = null;
  }

  formValidator() {
    let valid = true;
    let data = this.data as any;
    for (const key in this.data) {
      if (key === 'male' || key === 'female' || key === 'id') {
        continue;
      }
      if (data[key] === '' || !data[key]) {
        valid = false;
        break;
      }
    }
    return valid;
  }
}
