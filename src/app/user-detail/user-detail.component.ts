import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { UsersService } from '../users.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditDataComponent } from '../dialog-edit-data/dialog-edit-data.component';
import { DialogDeleteClientComponent } from '../dialog-delete-client/dialog-delete-client.component';
import { DialogUploadFileComponent } from '../dialog-upload-file/dialog-upload-file.component';
import { Storage, ref, list, deleteObject } from '@angular/fire/storage';

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
  editMenuOpen: boolean= false;

  constructor(
    private location: Location,
    private usersService: UsersService,
    private dialog: MatDialog,
    private storage: Storage
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
        this.usersService.getAll();
      }
    });
  }

  uploadDocumentDialog() {
    const dialogRef = this.dialog.open(DialogUploadFileComponent, {});
    dialogRef.afterClosed().subscribe(() => {
      this.getCurrentUser();
    });
  }

  openPDF(url:any) {
    window.open(url.url, '_blank')
  }

  toggleEditMenu() {
    if (this.editMenuOpen) {
      this.editMenuOpen= false;
    }
    else {
      this.editMenuOpen= true;
    }
  }

  async deleteDocuments() {
    this.documents = this.documents.filter((d:any) => !d.selected);

    const userStorageRef = ref(this.storage, `documents/${this.url}`);
    const files = (await list(userStorageRef)).items;

    // Loop over each file in the storage folder
  for (const file of files) {
    // Check if the file's name is in the local array of selected documents
    const fileIndex = this.documents.findIndex(
      (d: any) => d.name === file.name
    );

    // If the file is not in the local array, delete it from storage
    if (fileIndex === -1) {
      await deleteObject(file);
    }
  }
  }

  getSelectedDocumentsCount(): number {

    let numberDocs= 0;
    if (this.documents && this.documents.length > 0) {
      numberDocs = this.documents.filter((doc: any) => doc.selected).length;
    }
    return numberDocs
  }
}
