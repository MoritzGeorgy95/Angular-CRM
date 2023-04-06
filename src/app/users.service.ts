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
  currentUser:any;

  constructor(private firestore: Firestore) {
    this.collection= collection(this.firestore, 'users');
    this.users= [];
    this.currentUser= {};
  }

  async getAll() {
    this.users= [];
    const dataBundle= await getDocs(this.collection);
    dataBundle.forEach((doc)=> {
      this.users.push(doc.data())
    })
  }

  async getSingle(id:any) {
    let docRef= doc(this.firestore, `users/${id}`);
    let docData= await getDoc(docRef);
    this.currentUser= docData.data();
  }

}
