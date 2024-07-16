import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './container/login.component';
import { SignupComponent } from './container/signup.component';
import { DashboardComponent } from './container/dashboard.component';
import { ForgotPasswordComponent } from './container/forgot-password.component';
import { VerificationComponent } from './container/verification.component';
import { AuthGuard } from './auth-guards/auth-guard.component';
import { AnonGuard } from './auth-guards/anon-guard.component';
import { OnBoardingComponent } from './container/onboarding.component';
import { VerificationInComplete } from './auth-guards/verification-incompleted';
import { OnBoardingIncomplete } from './auth-guards/onboarding-in-complete';
import { OnBoardingComplete } from './auth-guards/onboarding-complete';
import { VerificationComplete } from './auth-guards/verification-completed';

const routes: Routes = [
  // {path:'login',component:LoginComponent,canActivate:[AnonGuard]},
  // {path:'signup',component:SignupComponent},
  // {path:'dashboard',component:DashboardComponent},
  // {path:'forgot-password',component:ForgotPasswordComponent},
  // {path:'verify',component:VerificationComponent ,canActivate:[AuthGuard]},
  {
    path: '', canActivate: [AnonGuard],
    children: [
      { path: 'signup', component: SignupComponent },
      { path: '', component: LoginComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent }
    ]
  },
  {
    path: '', canActivate: [AuthGuard], children: [
      { path: 'verify', canActivateChild:[], component: VerificationComponent ,canActivate:[VerificationInComplete] },
      { path: 'on-boarding', component: OnBoardingComponent ,canActivate:[VerificationComplete,OnBoardingIncomplete]},
      { path: 'dashboard', component: DashboardComponent,canActivate:[VerificationComplete,OnBoardingComplete] },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
