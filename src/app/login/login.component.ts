import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  hide:boolean= true;
  email:string;
  password:string;
  userName: string;
  signupMode: boolean = false;
  signUpSuccess:boolean= false;

  constructor(public router: Router, private auth: Auth, private usersService: UsersService) {
    
  }

  async guestLogin() {
    this.email= 'guest@email.com';
    this.password= 'password'
    this.usersService.connectToDatabase('guest', 'Guest');

    setTimeout(()=> { 
      this.router.navigateByUrl('/dashboard');
    }, 1500)
  }

  async logIn() {
    try {
      await signInWithEmailAndPassword(this.auth, this.email, this.password);
      this.usersService.connectToDatabase(this.auth.currentUser?.uid || '', this.auth.currentUser?.displayName || '');
      this.router.navigateByUrl('/dashboard');
    }
    catch (error) {
      alert(error)
    }
    
  }

  async signUp() {
     try {
    const credential = await createUserWithEmailAndPassword(this.auth, this.email, this.password);
    const user = credential.user;
    if (user) {
      this.signUpSuccess= true;
      await updateProfile(user, { displayName: this.userName });
      setTimeout(()=> {
        this.usersService.addNotesDocument(this.auth.currentUser?.uid || '')
        this.logIn()
       
      })
    }
  } catch (error) {
    alert(error);
  }
  }

}
