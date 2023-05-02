import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-calendar',
  templateUrl: './dialog-calendar.component.html',
  styleUrls: ['./dialog-calendar.component.scss']
})
export class DialogCalendarComponent {
  constructor(private dialog: MatDialog) {

  }

  onNoClick() {
    this.dialog.closeAll();
  }
}
