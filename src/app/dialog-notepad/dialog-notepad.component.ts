import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersService } from '../users.service';
import { doc, updateDoc } from 'firebase/firestore';
@Component({
  selector: 'app-dialog-notepad',
  templateUrl: './dialog-notepad.component.html',
  styleUrls: ['./dialog-notepad.component.scss'],
})
export class DialogNotepadComponent {
  currenNote: string= '';

  constructor(
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private usersService: UsersService
  ) {
  }

  saveNote() {
    if (this.currenNote != '') {
      this.data.data[0].notes.push(this.currenNote);
      this.currenNote = '';
      this.uploadNote();
    }
  }


  async uploadNote() {
    let docRef= doc(this.usersService.collection, 'notes');
    updateDoc(docRef, {notes: this.data.data[0].notes});
  }

  async deleteNote(index:number) {
    this.data.data[0].notes.splice(index, 1);
    let docRef= doc(this.usersService.collection, 'notes');
    updateDoc(docRef, {notes: this.data.data[0].notes});
  }
}
