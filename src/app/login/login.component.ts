import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  hide:boolean= true;
  guestEmail:string;
  guestPassword:string;

  constructor(public router: Router) {
    
  }

  guestLogin() {
    this.guestEmail= 'guest@email.com';
    this.guestPassword= 'password'

    setTimeout(()=> {
      this.router.navigateByUrl('/dashboard');
    }, 1500)
  }
}
