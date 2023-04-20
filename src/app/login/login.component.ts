import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
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
  signupMode: boolean = false;
  signUpSuccess:boolean= false;

  constructor(public router: Router, private auth: Auth, private usersService: UsersService) {
    
  }

  guestLogin() {
    this.email= 'guest@email.com';
    this.password= 'password'

    setTimeout(()=> {
      this.usersService.connectToDatabase('guest')
      this.router.navigateByUrl('/dashboard');
    }, 1500)
  }

  logIn() {
    signInWithEmailAndPassword(this.auth, this.email, this.password).then(() => {
      this.usersService.connectToDatabase(this.auth.currentUser?.uid || '')
      this.router.navigateByUrl('/dashboard');
    })
    .catch(error => {
      alert(error)
    });
  }

  signUp() {
    createUserWithEmailAndPassword(this.auth, this.email, this.password).then(() => {
      this.signUpSuccess= true;

      // setTimeout(()=> {

      // }, 1000)

    }).catch(error => {
      alert(error)
    })
  }
}
