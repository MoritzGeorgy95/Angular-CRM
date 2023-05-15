import { Component } from '@angular/core';
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
  searchText: string;
  numberOfClients: number = 0;
  companyInput: boolean = false;
  cityInput: boolean = false;
  genderInput: boolean = false;
  queryParam: string = '';

  /**
   *
   * @param usersService The UsersService is injected to access client data and perform CRUD operations.
   * @param dialog The MatDialog service is injected to open pre-styled material design dialogs.
   * @param router Router gets injected to enable direct URL navigation.
   */
  constructor(
    public usersService: UsersService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.users$ = this.usersService.users;
  }

  /**
   *
   * @param id string; Client ID so user can click on client to see detailed information.
   */
  showUserDetail(id: string) {
    this.router.navigateByUrl(`/users/${id}`);
  }

  /**
   * Open Add New Client Dialog
   */
  openDialog() {
    const dialogRef = this.dialog.open(DialogAddUserComponent, {});

    dialogRef.afterClosed().subscribe(() => {
      this.usersService.getAll();
    });
  }

  /**
   * Function to search individual user
   */
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

  /**
   * Logic to filter clients according to certain criteria.
   */

  /**
   * @param clickedCheckbox string; Checks which filter has been chosen by the user. Toggles the display of the corresponding input fields.
   */

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
