import { Component } from '@angular/core';
import { CrudService } from './crud.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-homework';
  logoimg = "https://angular.io/assets/images/logos/angular/logo-nav@2x.png";

  constructor(public service:CrudService) { }
  
  logout(){
    this.service.logout();
    // window.location.reload();
  }
}
