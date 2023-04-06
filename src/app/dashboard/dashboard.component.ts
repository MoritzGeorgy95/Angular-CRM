import { Component, OnInit } from '@angular/core';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { MatDialog } from '@angular/material/dialog';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { UsersService } from '../users.service';
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
  constructor(private dialog: MatDialog, private usersService: UsersService) {}

  users:any;

  ngOnInit() {
    this.usersService.getData();
    this.users = this.usersService.users;
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent, {});
  }
}
