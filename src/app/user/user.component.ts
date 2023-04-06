import { Component} from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  users: any

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.usersService.getData();
    this.users = this.usersService.users;
  }

  
}
