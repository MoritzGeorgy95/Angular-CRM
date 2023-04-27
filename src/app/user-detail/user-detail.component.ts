import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { UsersService } from '../users.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditDataComponent } from '../dialog-edit-data/dialog-edit-data.component';
import { DialogDeleteClientComponent } from '../dialog-delete-client/dialog-delete-client.component';
import { DialogUploadFileComponent } from '../dialog-upload-file/dialog-upload-file.component';
import { DialogAddProjectComponent } from '../dialog-add-project/dialog-add-project.component';
import { DialogEditProjectComponent } from '../dialog-edit-project/dialog-edit-project.component';
import { Storage, ref, list, deleteObject } from '@angular/fire/storage';
import { doc, updateDoc } from 'firebase/firestore';
import { trigger, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          animate('225ms', style({
            opacity: 1
          }))
        ]),
        transition(':leave', [
          animate('225ms', style({
            opacity: 0
          }))
        ])
      ]
    )
  ]
})
export class UserDetailComponent {
  userData: any;
  url: any;
  panelOpenState = false;
  customAvatar: any;
  userDeleted: boolean = false;
  documents: any;
  editMenuOpen1: boolean = false;
  editMenuOpen2: boolean = false;
  date: any;

  constructor(
    private location: Location,
    private usersService: UsersService,
    private dialog: MatDialog,
    private storage: Storage
  ) {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.url = this.location.path().split('/')[2];
    this.usersService.getSingle(this.url).then(() => {
      this.userData = this.usersService.currentUser;
      this.customAvatar = this.usersService.currentUserCustomImage;
      this.documents = this.usersService.currentUserDocuments;
      this.sortProjectsByDeadline();
    });
  }

  editDataDialog(data: any) {
    const dialogRef = this.dialog.open(DialogEditDataComponent, {
      data: { data },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getCurrentUser();
    });
  }

  projectDialog(i:number) {
    const dialogRef= this.dialog.open(DialogEditProjectComponent, {
      data: [this.userData.projects[i], i]
    });
    dialogRef.afterClosed().subscribe(()=> {
      this.getCurrentUser();
    })
  }

  deleteClientDialog() {
    const dialogRef = this.dialog.open(DialogDeleteClientComponent, {});

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userDeleted = true;
        this.usersService.getAll();
      }
    });
  }

  uploadDocumentDialog() {
    const dialogRef = this.dialog.open(DialogUploadFileComponent, {});
    dialogRef.afterClosed().subscribe(() => {
      this.getCurrentUser();
    });
  }

  addProjectDialog() {
    const dialogRef = this.dialog.open(DialogAddProjectComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.getCurrentUser();
    });
  }

  openPDF(url: any) {
    window.open(url.url, '_blank');
  }

  toggleEditMenu(selector: number = 0) {
    if (selector === 0) {
      if (this.editMenuOpen1) {
        this.editMenuOpen1 = false;
      } else {
        this.editMenuOpen1 = true;
      }
    } else {
      if (this.editMenuOpen2) {
        this.editMenuOpen2 = false;
      } else {
        this.editMenuOpen2 = true;
      }
    }
  }

  async deleteDocuments() {
    this.documents = this.documents.filter((d: any) => !d.selected);
    this.editMenuOpen1 = false;
    const userStorageRef = ref(
      this.storage,
      `user_${this.usersService.currentlyLoggedIn}/documents/${this.url}`
    );
    const files = (await list(userStorageRef)).items;

    // Loop over each file in the storage folder
    for (const file of files) {
      // Check if the file's name is in the local array of selected documents
      const fileIndex = this.documents.findIndex(
        (d: any) => d.name === file.name
      );

      // If the file is not in the local array, delete it from storage
      if (fileIndex === -1) {
        await deleteObject(file);
      }
    }
  }

  getSelectedDocumentsCount(): number {
    let numberDocs = 0;
    if (this.documents && this.documents.length > 0) {
      numberDocs = this.documents.filter((doc: any) => doc.selected).length;
    }
    return numberDocs;
  }

  async deleteProjects() {
    this.userData.projects = this.userData.projects.filter((p: any) => !p.selected);
    let docRef= doc(this.usersService.collection, this.url);
    await updateDoc(docRef, {
      projects: this.userData.projects
    })
    this.editMenuOpen2 = false;
  }

  

  getSelectedProjectsCount(): number {
    let numberProjs = 0;
    if (this.userData.projects.length > 0) {
      numberProjs = this.userData.projects.filter((p: any) => p.selected).length;
    }
    return numberProjs;
  }

  sortProjectsByDeadline(): void {
    this.userData.projects.sort(
      (a: { deadline: string }, b: { deadline: string }) => {
        const deadlineA = new Date(a.deadline);
        const deadlineB = new Date(b.deadline);
        return deadlineA.getTime() - deadlineB.getTime();
      }
    );
  }

  getDeadlineClass(project: any, useCase: number) {
    const deadlineStr = project.deadline;
    const deadline = new Date(deadlineStr);
    const now = new Date();
    const diffInDays = Math.floor(
      (deadline.getTime() - now.getTime()) / (1000 * 3600 * 24)
    );

    if (useCase === 0) {
      if (diffInDays <= 7) {
        return 'red';
      } else if (diffInDays <= 30) {
        return 'orange';
      } else {
        return 'green';
      }
    } else {
      if (diffInDays <= 7) {
        return 'arrow-red.png';
      } else if (diffInDays <= 30) {
        return 'arrow-orange.png';
      } else {
        return 'arrow-green.png';
      }
    }
  }
}
