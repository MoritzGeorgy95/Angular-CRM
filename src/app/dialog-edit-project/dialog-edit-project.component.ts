import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersService } from '../users.service';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dialog-edit-project',
  templateUrl: './dialog-edit-project.component.html',
  styleUrls: ['./dialog-edit-project.component.scss'],
})
export class DialogEditProjectComponent {
  url: any;
  title: string = '';
  description: string = '';
  deadline: Date;
  selected: boolean = false;

  constructor(
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private usersService: UsersService,
    private location: Location
  ) {
    this.title = data[0].title;
    this.description = data[0].description;
    this.deadline = new Date(data[0].deadline);
    this.url = this.location.path().split('/')[2];
  }

  onNoClick() {
    this.dialog.closeAll();
  }

  async updateData() {
    const timeZoneOffset = this.deadline.getTimezoneOffset();
    const adjustedDeadline = new Date(
      this.deadline.getTime() - timeZoneOffset * 60 * 1000
    );
    const docRef = doc(this.usersService.collection, this.url);
    const newProject = {
      title: this.title,
      description: this.description,
      deadline: adjustedDeadline.toISOString().slice(0, 10),
      selected: this.selected,
    };

    await updateDoc(docRef, {
      projects: arrayRemove(this.data[0]),
    });

    await updateDoc(docRef, {
      projects: arrayUnion(newProject),
    });

    this.dialog.closeAll();
  }
}
