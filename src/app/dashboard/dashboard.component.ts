import { Component, OnInit } from '@angular/core';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { MatDialog } from '@angular/material/dialog';
import { Firestore, collectionData } from '@angular/fire/firestore';
import {
  addDoc,
  onSnapshot,
  collection,
  CollectionReference,
  doc,
  DocumentData,
  getDoc,
  updateDoc,
} from 'firebase/firestore';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})

export class DashboardComponent implements OnInit{
  constructor(private dialog: MatDialog, private firestore: Firestore) {}

  users: object[] = [];
  collection:any;

  ngOnInit() {
    this.collection= collection(this.firestore, 'users');
    console.log(collectionData(this.collection))
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogAddUserComponent, {});

    dialogRef.afterClosed().subscribe((result) => {
      this.users.push(result);
      console.log(this.users);
    });
  }
}
