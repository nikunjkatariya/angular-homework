import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

import { CustomersComponent } from './customers/customers.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [  
  {path:'login',component:LoginComponent},
  {path:'customers',component:CustomersComponent,canActivate:[AuthGuard]},
  {path:'**',component:LoginComponent},
  {path:'',component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
