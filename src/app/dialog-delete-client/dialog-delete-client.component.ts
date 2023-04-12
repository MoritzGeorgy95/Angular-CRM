import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from '../users.service';
import { Location } from '@angular/common';
import { doc, deleteDoc } from 'firebase/firestore';
import { Storage } from '@angular/fire/storage';
import { ref, list, deleteObject } from 'firebase/storage';

@Component({
  selector: 'app-dialog-delete-client',
  templateUrl: './dialog-delete-client.component.html',
  styleUrls: ['./dialog-delete-client.component.scss'],
})
export class DialogDeleteClientComponent {
  url: any;
  success: boolean = true;

  constructor(
    private dialog: MatDialog,
    private usersService: UsersService,
    private location: Location,
    public storage: Storage
  ) {
    this.url = this.location.path().split('/')[2];
  }

  onNoClick() {
    this.dialog.closeAll();
  }

  async deleteClientAccount() {
    let docRef= doc(this.usersService.collection, this.url);
    await deleteDoc(docRef);

    const userStorageRef = ref(this.storage, `avatarImages/${this.url}`);
    const files = await list(userStorageRef);

    if (files.items.length > 0) {
      const filePath = files.items[0];
      await deleteObject(filePath);
    }

    this.dialog.closeAll();
  }
}
