import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from '../crud.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  constructor(private builder:FormBuilder,private service:CrudService,private router:Router) { }

  loginForm:any;
  logoimg = "https://angular.io/assets/images/logos/angular/logo-nav@2x.png";
  ngOnInit(): void {
    this.loginForm=new FormGroup({
      username:new FormControl('',Validators.required),
      password:new FormControl('',Validators.required)
    });
    this.service.getLoginList().subscribe(data=>this.storeUsers(data));
  }

  getUsers:any;
  storeUsers(data:any){
    this.getUsers=data;
  }
  
  authentication(form:FormGroup){
    for(let i=0;i<this.getUsers.length;i++){    
      if(this.getUsers[i].user_name==form.value.username&&this.getUsers[i].password==form.value.password){
        this.service.login();
        this.router.navigate(['/','customers']);
      }
    }
  }

}
