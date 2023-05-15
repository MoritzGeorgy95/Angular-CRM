import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from '@angular/fire/auth';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  hide: boolean = true;
  email: string;
  password: string;
  userName: string;
  signupMode: boolean = false;
  signUpSuccess: boolean = false;

  /**
   * @param router The router service used for navigation.
   * @param auth The authentication service used for user authentication on firebase.
   * @param usersService The UsersService used for database operations.
   */

  constructor(
    public router: Router,
    private auth: Auth,
    private usersService: UsersService
  ) {}

  /**
   * Performs a guest login by setting predefined email and password,
   * connecting to the database, and navigating to the dashboard.
   */
  async guestLogin() {
    this.email = 'guest@email.com';
    this.password = 'password';
    this.usersService.connectToDatabase('guest', 'Guest');
    localStorage.setItem('authToken', 'guest');

    setTimeout(() => {
      this.router.navigateByUrl('/dashboard');
    }, 1500);
  }

  /**
   * Performs a login by using the provided email and password using firebase auth,
   * connects to the database, and navigates to the dashboard upon successful login.
   */
  async logIn() {
    try {
      await signInWithEmailAndPassword(this.auth, this.email, this.password);
      const user = this.auth.currentUser;
      if (user) {
        const authData = { id: user.uid, name: user.displayName };
        localStorage.setItem('authToken', JSON.stringify(authData));
        this.usersService.connectToDatabase(user.uid, user.displayName || '');
        this.router.navigateByUrl('/dashboard');
      }
    } catch (error) {
      alert(error);
    }
  }

  /**
   * Performs a signup by creating a new user with the provided email and password,
   * updates the user's profile with the entered username, connects to the database,
   * and navigates to the dashboard.
   */
  async signUp() {
    try {
      const credential = await createUserWithEmailAndPassword(
        this.auth,
        this.email,
        this.password
      );
      const user = credential.user;
      if (user) {
        this.signUpSuccess = true;
        await updateProfile(user, { displayName: this.userName });
        setTimeout(() => {
          this.usersService.addNotesDocument(this.auth.currentUser?.uid || '');
          this.logIn();
        });
      }
    } catch (error) {
      alert(error);
    }
  }
}
