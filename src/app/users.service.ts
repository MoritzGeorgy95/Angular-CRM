import { Injectable } from '@angular/core';
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
  getDocs,
} from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  users:any;
  collection:any;

  constructor(private firestore: Firestore) {
    this.collection= collection(this.firestore, 'users');
    this.users= [];
  }

  async getData() {
    this.users= [];
    const dataBundle= await getDocs(this.collection);
    dataBundle.forEach((doc)=> {
      this.users.push(doc.data())
    })
  }

}
