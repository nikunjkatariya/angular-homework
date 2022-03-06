import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private http: HttpClient,private router:Router) { }

  isLoggedIn = false;

  redirectUrl : string | null = null ;

  login():Observable<boolean>{
    this.isLoggedIn=true;
    return of(true).pipe(
      delay(1000)
    );
  }

  logout(){
    this.isLoggedIn=false;
    this.router.navigate(['/','login']);
  }

  //Login
  getLoginList(){
    return this.http.get("http://localhost:3000/login_details/");
  }

  //Customers
  getCustomerList() {
    return this.http.get("http://localhost:3000/customer_details/");
  }

  postCustomer(data: any) {
    return this.http.post("http://localhost:3000/customer_details/", data);
  }

  putCustomer(id: any, data: any) {
    return this.http.put("http://localhost:3000/customer_details/"+id, data);
  }

  deleteCustomer(id: any) {
    return this.http.delete(`http://localhost:3000/customer_details/${id}`);
  }
  
}
