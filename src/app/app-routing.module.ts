import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './container/login.component';
import { SignupComponent } from './container/signup.component';
import { DashboardComponent } from './container/dashboard.component';
import { ForgotPasswordComponent } from './container/forgot-password.component';

const routes: Routes = [
  // {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'forgot-password',component:ForgotPasswordComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
