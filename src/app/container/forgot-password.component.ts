import { Component, OnInit } from '@angular/core';
import { AlertService } from '../services/alert.service';
import { ApiService } from '../services/api.service';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User, UserRes } from '../model/user';
import { Router } from '@angular/router';
import { AuthRepository } from '../repository/repository/auth-repository';

@Component({
  selector: 'app-forgot-password',
  template: `
      <form [formGroup]="forgotPasswordForm" class="overlay" fxLayoutAlign="center center" fxLayout="column" fxLayoutGap="40px" (ngSubmit)="forgotPasswordForm  && !this.isEmailSent ? sendEmail(): changePassword()">
        <!-- <div  > -->
        <img width="20%" src="assets/digiresume-green.png" />
        <mat-card fxLayout="column" appearance="raised"  >
            <h2 >Forgot Password</h2>           
            <mat-form-field *ngIf="!isEmailSent; else postEmail" style="margin-top:0.5rem">
            <mat-label>Email</mat-label>
            <input  formControlName="email" type="email" matInput placeholder="Email" />
            <mat-error>Valid Email is required</mat-error>
            </mat-form-field>
           <ng-template #postEmail>
           <mat-form-field style="margin-top:0.5rem" >
              <mat-label>Code</mat-label>
              <input formControlName="code" type="code" matInput placeholder="Code" />
              <mat-error>Valid Code is required</mat-error>
            </mat-form-field>
           <mat-form-field style="margin-top:0.5rem" >
              <mat-label>New Password</mat-label>
              <input formControlName="new_password" type="password" matInput placeholder="new password" />
              <mat-error>Valid Password is required</mat-error>
            </mat-form-field>
            <mat-form-field style="margin-top:0.5rem" >
              <mat-label>Confirm Password</mat-label>
              <input formControlName="confirm_password"  matInput placeholder="Confirm Password" />
              <mat-error>Valid Password is required</mat-error>
            </mat-form-field>
           </ng-template>                                         
            <div fxLayout ="row" fxLayoutGap="20px" fxLayoutAlign="end">
            <mat-spinner *ngIf="loading" diameter="40" color="accent"></mat-spinner> 
            <button *ngIf="!isEmailSent"  type="button"  class="accent" color="accent" (click)="sendEmail()"  mat-raised-button>Send Email</button>
            <button *ngIf="isEmailSent"    type="submit"  class="accent" color="accent"  mat-raised-button>Change Password</button>
            <button  type="button"  class="accent" color="accent"  mat-raised-button (click)="login()">Back To Login</button>
            </div>
        </mat-card>
        <!-- </div> -->
    </form>
`,
  styles: [` mat-card {
    padding: 10px;
    height: 24rem;
    width: 25rem;
}
.overlay {
      width: 100%;
      height: 100%;
    }



`]
})
export class ForgotPasswordComponent {


  forgotPasswordForm: FormGroup;
  loading: boolean = false;
  isEmailSent: boolean = false;

  constructor(private authRepo: AuthRepository,  private alertService: AlertService, private router: Router) {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl(null, this.isValidationBeforeEmail()),
      code: new FormControl(null, this.isValidationAfterEmail()),
      new_password: new FormControl(null, this.isValidationAfterEmail()),
      confirm_password: new FormControl(null, this.isValidationAfterEmail())
    })
  }

  isValidationAfterEmail() {
    return this.isEmailSent ? [Validators.required] : []
  }

  isValidationBeforeEmail() {
    return !this.isEmailSent ? [Validators.required] : []
  }
  ngOnInit(): void {
  }

  sendEmail() {
    this.loading = true;
    this.authRepo.sendResetPasswordEmail(this.forgotPasswordForm.value).subscribe((data) => {
      this.loading = false;
      this.isEmailSent = true;
      this.alertService.success('Email has been sent to ' + this.forgotPasswordForm.get('email')?.value);
      this.forgotPasswordForm.get('code')?.setValidators([Validators.required]);
      this.forgotPasswordForm.get('new_password')?.setValidators([Validators.required]);
      this.forgotPasswordForm.get('confirm_password')?.setValidators([Validators.required]);
    }, (error => {
      this.loading = false;
    }));
  }

  changePassword() {
    this.loading = true;
    const observer$ = this.authRepo.resetPassword(this.forgotPasswordForm.value);
    observer$.subscribe((data:any) => {
      this.loading = false;
      this.router.navigate(['login']);
      this.alertService.success('Password Updated Successfully');
    }, ((error:any) => {
      this.loading = false;
    }));
  }


  login() {
    this.router.navigate([''])
  }



}
