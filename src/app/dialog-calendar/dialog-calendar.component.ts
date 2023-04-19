import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarComponentComponent } from '../calendar-component/calendar-component.component';

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
