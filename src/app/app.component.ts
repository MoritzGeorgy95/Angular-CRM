import { Component } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'crm-app';
  opened: boolean= false;
 

  constructor(public router: Router) {
  }
  

 
  
}
 