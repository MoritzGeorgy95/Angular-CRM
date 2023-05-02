import { Component, ViewEncapsulation } from '@angular/core';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  users$: Observable<any>;
  searchText: any;
  numberOfClients: number = 0;
  companyInput: boolean = false;
  cityInput: boolean = false;
  genderInput: boolean = false;
  queryParam: string = '';

  constructor(
    public usersService: UsersService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.users$ = this.usersService.users;
  }

  showUserDetail(id: any) {
    this.router.navigateByUrl(`/users/${id}`);
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogAddUserComponent, {});

    dialogRef.afterClosed().subscribe(() => {
      this.usersService.getAll();
    });
  }

  searchUser() {
    this.users$ = this.users$.pipe(
      map((users: any[]) =>
        users.filter(
          (user) =>
            user.firstname
              .toLowerCase()
              .includes(this.searchText.toLowerCase()) ||
            user.lastname.toLowerCase().includes(this.searchText.toLowerCase())
        )
      )
    );
  }

  sendMail(mail: string) {
    window.location.href = `mailto:${mail}`;
  }

  onCheckboxClicked(clickedCheckbox: string) {
    this.queryParam = '';
    if (clickedCheckbox === 'company') {
      this.cityInput = false;
      this.genderInput = false;
    } else if (clickedCheckbox === 'city') {
      this.companyInput = false;
      this.genderInput = false;
    } else if (clickedCheckbox === 'gender') {
      this.companyInput = false;
      this.cityInput = false;
    }
  }

  applyFilter() {
    if (this.queryParam != '') {
      let paramType: string;
      if (this.companyInput) {
        paramType = 'company';
      } else if (this.cityInput) {
        paramType = 'city';
      } else if (this.genderInput) {
        paramType = 'gender';
      }

      this.users$ = this.users$.pipe(
        map((users: any[]) =>
          users.filter((user) =>
            user[`${paramType}`]
              .toLowerCase()
              .includes(this.queryParam.toLowerCase())
          )
        )
      );
    }
  }

  resetFilter() {
    this.users$ = this.usersService.users;
    this.queryParam = '';
  }
}
