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
import { OnBoardingIntroComponent } from './container/on-boarding-intro.component';
import { SecondaryComponent } from './container/secondary.component';
import { LogoutComponent } from './components/logout.component';
import { DemoComponent } from './container/on-boarding/demo.component';

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
    path: '', canActivate: [AuthGuard,VerificationInComplete], children: [
      { path: 'verify', component: VerificationComponent  },
    ]  
  },
  {
    path: '', canActivate: [AuthGuard], children: [
      { path: 'logout', component: LogoutComponent  },
    ]  
  },
  {
    path: '', canActivate:[AuthGuard,VerificationComplete,OnBoardingIncomplete] ,children: [
      { path: 'on-boarding', component: OnBoardingIntroComponent } ,   
      { path: 'on-boarding/add', component: OnBoardingComponent } ,   
    ]  
  },
  {
    path: '',canActivate:[AuthGuard ,VerificationComplete,OnBoardingComplete], children: [    
      { path: 'dashboard', component: DashboardComponent },
    ]  
  },
  {path:'demo',component:DemoComponent},
  {path:'chat',component:SecondaryComponent,outlet:'chat-r'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{  initialNavigation: 'enabledBlocking',
    // enableTracing: true,
})],
  exports: [RouterModule],
})
export class AppRoutingModule { }
