import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersService } from '../users.service';
import { doc, updateDoc } from 'firebase/firestore';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dialog-edit-data',
  templateUrl: './dialog-edit-data.component.html',
  styleUrls: ['./dialog-edit-data.component.scss'],
})
export class DialogEditDataComponent {
  url: any;

  constructor(
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private usersService: UsersService,
    private location: Location
  ) {
    this.url = this.location.path().split('/')[2];
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  async updateData() {
    let docRef = doc(this.usersService.collection, this.url);
    await updateDoc(docRef, this.data.data);
    this.dialog.closeAll();
  }

  trackByFn(index: any, item: any) {
    return index;
  }
}
