import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UsersService } from './users.service';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'crm-app';
  opened: boolean = true;
  userMenuOpen: boolean = false;
  date: Date = new Date();

  constructor(public router: Router, public usersService: UsersService) {}

  async ngOnInit() {
    const authToken = localStorage.getItem('authToken');

    if (authToken) {
      if (authToken === 'guest') {
        this.usersService.connectToDatabase('guest', 'Guest');
      } else {
        const authData = JSON.parse(authToken);
        this.usersService.connectToDatabase(authData.id, authData.name);
      }
    } else {
      this.router.navigateByUrl('/login');
    }

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.userMenuOpen = false;
      }
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
