import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogWalkthroughComponent } from '../dialog-walkthrough/dialog-walkthrough.component';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent {
  constructor(private dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(DialogWalkthroughComponent);
  }
}
