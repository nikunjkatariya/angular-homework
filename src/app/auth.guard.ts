import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private service: CrudService, private router:Router) { }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean{
      return this.checkLogin();
  }

  checkLogin():Observable<boolean>|boolean{
    if(this.service.isLoggedIn){
      return true;
    }
    else{
      this.router.navigate(['/','login']);
      return false;
    }
  }
  
}
