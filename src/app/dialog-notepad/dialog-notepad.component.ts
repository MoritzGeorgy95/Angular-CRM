import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
@Component({
  selector: 'app-dialog-notepad',
  templateUrl: './dialog-notepad.component.html',
  styleUrls: ['./dialog-notepad.component.scss']
})
export class DialogNotepadComponent {
  notes$: Observable<string[]>= of(this.data.data);
  currenNote: string;

  constructor(private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

    saveNote() {
    this.data.data.push(this.currenNote);
    this.currenNote= '';
  }
}
