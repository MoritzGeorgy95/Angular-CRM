import { Injectable } from '@angular/core';
import { Firestore} from '@angular/fire/firestore';
import { Storage} from '@angular/fire/storage';
import {
  addDoc,
  onSnapshot,
  collection,
  CollectionReference,
  doc,
  DocumentData,
  getDoc,
  updateDoc,
  getDocs
} from 'firebase/firestore';

import { getDownloadURL, list, ref, uploadBytes } from 'firebase/storage'

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  users:any;
  collection:any;
  currentUser:any;
  currentUserCustomImage: any;

  constructor(private firestore: Firestore, public storage: Storage) {
    this.collection= collection(this.firestore, 'users');
    this.users= [];
    this.currentUser= {};
    this.currentUserCustomImage= '';
  }

  async getAll() {
    this.users= [];
    const dataBundle= await getDocs(this.collection);
    dataBundle.forEach((doc)=> {
      this.users.push(doc.data())
    })
  }

  async getSingle(id:any) {
    //get text data
    let docRef= doc(this.firestore, `users/${id}`);
    let docData= await getDoc(docRef);
    this.currentUser= docData.data();

    //get multimedia data
    const imgRef= ref(this.storage, `avatarImages/${id}`)
    const files= await list(imgRef);
    if (files.items.length == 1) {
      const avatarRef = files.items[0];
      this.currentUserCustomImage= await getDownloadURL(avatarRef);
    }
    else {
      this.currentUserCustomImage= null;
    }
  }

  async uploadImage(file: File, id:string) {
    const filePath= `avatarImages/${id}/${file.name}`;
    const imagesRef= ref(this.storage, filePath);
    await uploadBytes(imagesRef, file);
  }

}
