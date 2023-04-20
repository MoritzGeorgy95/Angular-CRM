import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Storage } from '@angular/fire/storage';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';

import { getDownloadURL, list, ref, uploadBytes } from 'firebase/storage';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private _users: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public readonly users = this._users.asObservable();

  collection: any;
  currentUser: any;
  currentUserCustomImage: any;
  currentUserDocuments: any;
  currentlyLoggedIn: string;
  currentlyLoggedInUserName: string;

  constructor(private firestore: Firestore, public storage: Storage) {}

  async getAll() {
    const users: any[] = [];
    const dataBundle = await getDocs(this.collection);
    dataBundle.forEach((doc) => {
      users.push(doc.data());
    });
    this._users.next(users);
  }

  async getSingle(id: any) {
    //get text data
    let infoRef = doc(this.firestore, `user_${this.currentlyLoggedIn}/${id}`);
    let infoData = await getDoc(infoRef);
    this.currentUser = infoData.data();

    //get multimedia data
    //imgs
    const imgRef = ref(
      this.storage,
      `user_${this.currentlyLoggedIn}/avatarImages/${id}`
    );
    const imgFiles = await list(imgRef);
    if (imgFiles.items.length == 1) {
      const avatarRef = imgFiles.items[0];
      this.currentUserCustomImage = await getDownloadURL(avatarRef);
    } else {
      this.currentUserCustomImage = null;
    }
    //docs
    const docRef = ref(
      this.storage,
      `user_${this.currentlyLoggedIn}/documents/${id}`
    );
    const docFiles = await list(docRef);
    if (docFiles.items.length > 0) {
      this.currentUserDocuments = [];
      for (let i = 0; i < docFiles.items.length; i++) {
        const doc = docFiles.items[i];
        const url = await getDownloadURL(doc);
        this.currentUserDocuments.push({ doc: doc, url: url, selected: false });
      }
    } else {
      this.currentUserDocuments = null;
    }
  }

  async uploadImage(file: File, id: string) {
    const allowedTypes = ['image/png', 'image/jpeg'];
    if (allowedTypes.indexOf(file.type) === -1) {
      alert('Invalid file type! Please upload a PNG or JPEG image.');
    } else {
      const filePath = `user_${this.currentlyLoggedIn}/avatarImages/${id}/${file.name}`;
      const imagesRef = ref(this.storage, filePath);
      await uploadBytes(imagesRef, file);
    }
  }

  async UploadFile(file: File, id: string) {
    const allowedTypes = ['application/pdf'];

    if (allowedTypes.indexOf(file.type) === -1) {
      alert('Invalid file type! Documents have to be in pdf format!');
    } else {
      const filePath = `user_${this.currentlyLoggedIn}/documents/${id}/${file.name}`;
      const documentRef = ref(this.storage, filePath);
      await uploadBytes(documentRef, file);
    }
  }

  connectToDatabase(loggedInUser: string, loggedInUserUserName:string) {
    this.currentlyLoggedIn = loggedInUser;
    this.currentlyLoggedInUserName= loggedInUserUserName;
    this.collection = collection(
      this.firestore,
      `user_${this.currentlyLoggedIn}`
    );
    this.getAll();
  }
}
