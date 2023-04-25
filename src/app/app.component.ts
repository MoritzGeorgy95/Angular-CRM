import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from './users.service';
import { Auth, signInWithCustomToken } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'crm-app';
  opened: boolean = true;
  time: string;

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
}
