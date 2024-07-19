import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './services/http.service';
import { ApiService } from './services/api.service';
import { AlertService } from './services/alert.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoginComponent } from './container/login.component';
import { SignupComponent } from './container/signup.component';
import { ForgotPasswordComponent } from './container/forgot-password.component';
import { AuthRepository } from './repository/repository/auth-repository';
import { VerificationComponent } from './container/verification.component';
import { AuthGuard } from './auth-guards/auth-guard.component';
import { AnonGuard } from './auth-guards/anon-guard.component';
import { OnBoardingComponent } from './container/onboarding.component';
import { VerificationComplete } from './auth-guards/verification-completed';
import { VerificationInComplete } from './auth-guards/verification-incompleted';
import { OnBoardingIncomplete } from './auth-guards/onboarding-in-complete';
import { OnBoardingComplete } from './auth-guards/onboarding-complete';
import { OnBoardingIntroComponent } from './container/on-boarding-intro.component';
import { ResumeRepository } from './repository/repository/resume-repository';
import { ResumeNameComponent } from './container/on-boarding/resume-name.component';
import { UploadComponent } from './container/on-boarding/tabs/upload.componet';
import { UploadImageComponent } from './container/on-boarding/tabs/upload-image.component';
import { UploadFromDiskComponent } from './container/on-boarding/tabs/upload-from-disk.component';
import { ImportYoutubeComponent } from './container/on-boarding/tabs/import-youtube.component';
import { SecondaryComponent } from './container/secondary.component';
import { LogoutComponent } from './components/logout.component';
import { HeaderComponent } from './container/layout/header.component';
import { DemoComponent } from './container/on-boarding/demo.component';
import {FlexLayoutServerModule} from '@angular/flex-layout/server';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    VerificationComponent,
    OnBoardingComponent,
    OnBoardingIntroComponent,
    ResumeNameComponent,
    UploadComponent,
    UploadImageComponent,
    UploadFromDiskComponent,
    ImportYoutubeComponent,
    SecondaryComponent,
    LogoutComponent,
    HeaderComponent,
    DemoComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    MaterialModule  ,
    FlexLayoutModule ,
    ReactiveFormsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    FlexLayoutServerModule
    

  ],
  providers: [
    provideAnimationsAsync(),
    HttpService,
    ApiService,
    AlertService,
    AuthRepository,
    AuthGuard,
    AnonGuard,
    VerificationComplete,
    VerificationInComplete,
    OnBoardingIncomplete,
    OnBoardingComplete,
    ResumeRepository,
    provideClientHydration()
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
