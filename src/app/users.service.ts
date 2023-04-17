import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Storage } from '@angular/fire/storage';
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

import { getDownloadURL, list, ref, uploadBytes } from 'firebase/storage';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  users: any;
  collection: any;
  currentUser: any;
  currentUserCustomImage: any;
  currentUserDocuments: any;

  constructor(private firestore: Firestore, public storage: Storage) {
    this.collection = collection(this.firestore, 'users');
    this.users = [];
    this.currentUser = {};
    this.currentUserCustomImage = '';
    this.currentUserDocuments= [];
  }

  async getAll() {
    this.users = [];
    const dataBundle = await getDocs(this.collection);
    dataBundle.forEach((doc) => {
      this.users.push(doc.data());
    });
  }

  async getSingle(id: any) {
    //get text data
    let infoRef = doc(this.firestore, `users/${id}`);
    let infoData = await getDoc(infoRef);
    this.currentUser = infoData.data();

    //get multimedia data
    //imgs
    const imgRef = ref(this.storage, `avatarImages/${id}`);
    const imgFiles = await list(imgRef);
    if (imgFiles.items.length == 1) {
      const avatarRef = imgFiles.items[0];
      this.currentUserCustomImage = await getDownloadURL(avatarRef);
    } else {
      this.currentUserCustomImage = null;
    }
    //docs
    const docRef= ref(this.storage, `documents/${id}`);
    const docFiles = await list(docRef);
    if(docFiles.items.length > 0) {
      docFiles.items.forEach(item => {
        this.currentUserDocuments.push(item);
      })
    }
    else {
      this.currentUserDocuments= null;
    }
  }

  async uploadImage(file: File, id: string) {
    const allowedTypes = ['image/png', 'image/jpeg'];
    if (allowedTypes.indexOf(file.type) === -1) {
      alert('Invalid file type! Please upload a PNG or JPEG image.');
    } else {
      const filePath = `avatarImages/${id}/${file.name}`;
      const imagesRef = ref(this.storage, filePath);
      await uploadBytes(imagesRef, file);
    }
  }

  async UploadFile(file: File, id: string) {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    if (allowedTypes.indexOf(file.type) === -1) {
      alert('Invalid file type! Please upload a PDF or a Word Document.');
    } else {
      const filePath = `documents/${id}/${file.name}`;
      const documentRef = ref(this.storage, filePath);
      await uploadBytes(documentRef, file);
    }
  }
}
