import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from '../users.service';
import { Location } from '@angular/common';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-dialog-upload-file',
  templateUrl: './dialog-upload-file.component.html',
  styleUrls: ['./dialog-upload-file.component.scss'],
})
export class DialogUploadFileComponent {
  constructor(
    private dialog: MatDialog,
    private usersService: UsersService,
    private location: Location,
    private toast: HotToastService
  ) {
    this.id = this.location.path().split('/')[2];
  }

  document: File | null;
  id: any;

  onNoClick() {
    this.dialog.closeAll();
  }

  async uploadDocument() {
    if (this.document) {
      await this.usersService.UploadFile(this.document, this.id);
      this.dialog.closeAll();
    } else {
      this.toast.error('Please select a file!');
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.document = file;
    }
  }

  resetDocument() {
    this.document = null;
  }
}
