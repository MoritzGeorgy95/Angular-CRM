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
  encapsulation: ViewEncapsulation.None,
})
export class UserComponent {
  users$: Observable<any>;
  searchText: any;
  panelOpenState: boolean = false;

  constructor(
    private usersService: UsersService,
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
}
