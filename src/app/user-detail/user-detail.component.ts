import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { UsersService } from '../users.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditDataComponent } from '../dialog-edit-data/dialog-edit-data.component';
import { DialogDeleteClientComponent } from '../dialog-delete-client/dialog-delete-client.component';
import { DialogUploadFileComponent } from '../dialog-upload-file/dialog-upload-file.component';
import * as pdfjsLib from 'pdfjs-dist';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent {
  userData: any;
  url: any;
  panelOpenState = false;
  customAvatar: any;
  userDeleted: boolean = false;
  documents:any; 

  constructor(
    private location: Location,
    private usersService: UsersService,
    private dialog: MatDialog
  ) {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.url = this.location.path().split('/')[2];
    this.usersService.getSingle(this.url).then(() => {
      this.userData = this.usersService.currentUser;
      this.customAvatar = this.usersService.currentUserCustomImage;
      this.documents= this.usersService.currentUserDocuments;
    });
  }

  editDataDialog(data: any) {
    const dialogRef = this.dialog.open(DialogEditDataComponent, {
      data: { data },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getCurrentUser();
    });
  }

  deleteClientDialog() {
    const dialogRef = this.dialog.open(DialogDeleteClientComponent, {});

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userDeleted = true;
      }
    });
  }

  uploadDocumentDialog() {
    this.dialog.open(DialogUploadFileComponent, {});
  }

  showDocuments() {
    console.dir(this.documents)
  }
}
