import { Component} from '@angular/core';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  users: any;

  constructor(private usersService: UsersService, private router: Router) {}

  ngOnInit() {
    this.usersService.getAll();
    this.users = this.usersService.users;
  }

  showUserDetail(id:any) {
    this.router.navigateByUrl(`/users/${id}`);
  }
  
}
