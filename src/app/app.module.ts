import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule  ,
    FlexLayoutModule ,
    ReactiveFormsModule,
    HttpClientModule,
    MatProgressSpinnerModule
    

  ],
  providers: [
    provideAnimationsAsync(),
    HttpService,
    ApiService,
    AlertService
    
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
