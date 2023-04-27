import { Component} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from '../users.service';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dialog-add-project',
  templateUrl: './dialog-add-project.component.html',
  styleUrls: ['./dialog-add-project.component.scss']
})
export class DialogAddProjectComponent {
  
  url:any;

  title:string='';
  description:string= '';
  deadline:any= null;
  selected: boolean= false;

  constructor(private usersService: UsersService, private location: Location, private dialog: MatDialog) {
    this.url = this.location.path().split('/')[2];
  }

  async submitData() {
    let docRef = doc(this.usersService.collection, this.url);
    await updateDoc(docRef, {
      projects: arrayUnion({
        title: this.title,
        description: this.description,
        deadline: this.deadline.toISOString().slice(0, 10),
        selected: this.selected
      })
    });
    this.dialog.closeAll();
  }

  onNoClick() {
    this.dialog.closeAll();
  }

}
