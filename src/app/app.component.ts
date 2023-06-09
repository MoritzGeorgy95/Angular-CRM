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
  time: string;
  userMenuOpen: boolean = false;

  constructor(
    private auth: Auth,
    public router: Router,
    public usersService: UsersService
  ) {
    this.getCurrentHour();
  }

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

  getCurrentHour() {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      this.time = 'Good morning';
    } else if (currentHour >= 12 && currentHour < 18) {
      this.time = 'Good afternoon';
    } else if (currentHour >= 18 && currentHour < 22) {
      this.time = 'Good evening';
    } else {
      this.time = 'Good night';
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  alert() {
    alert('Legal notice still in working progress!');
  }
}
