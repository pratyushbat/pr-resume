import { Component, OnInit } from '@angular/core';
import { AlertService } from '../services/alert.service';
import { ApiService } from '../services/api.service';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User, UserRes } from '../model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  template: `
      <form [formGroup]="forgotPwdForm" class="overlay" fxLayoutAlign="center center" fxLayout="column" fxLayoutGap="40px" (ngSubmit)="forgotPwdForm.valid && forgotPwd()">
        <!-- <div  > -->
        <img width="20%" src="assets/digiresume-green.png" />
        <mat-card fxLayout="column" appearance="raised"  >
            <h2 >Forgot Password</h2>           
            <mat-form-field style="margin-top:0.5rem">
            <mat-label>Email</mat-label>
            <input  formControlName="email" type="email" matInput placeholder="Email" />
            <mat-error>Valid Email is required</mat-error>
            </mat-form-field>
                       
            <div fxLayout ="row" fxLayoutGap="20px" fxLayoutAlign="end">
            <mat-spinner *ngIf="loading" diameter="40" color="accent"></mat-spinner> 
            <button  type="submit"  class="accent" color="accent"  mat-raised-button>Send Email</button>
            <button  type="button"  class="accent" color="accent"  mat-raised-button (click)="login()">Back To Login</button>
            </div>
        </mat-card>
        <!-- </div> -->
    </form>
`,
  styles: [` mat-card {
    padding: 10px;
    height: 14rem;
    width: 25rem;
}
.overlay {
      width: 100%;
      height: 100%;
    }



`]
})
export class ForgotPasswordComponent {

  forgotPwdForm: FormGroup;
  loading: boolean = false;

  constructor(private apiService: ApiService, private alertService: AlertService, private router: Router) {
    this.forgotPwdForm = new FormGroup({
        email: new FormControl(null, [Validators.required, Validators.email])      
    })
}

ngOnInit(): void {
}

forgotPwd() {
    this.loading = true;
    const login$ = this.apiService.loginUser(this.forgotPwdForm.value);
    login$.subscribe((data: UserRes) => {
        // this.loading = false;
        // this.user = data.user;
        // console.log(data);
        this.alertService.success('Forgot Password Successful');
        this.router.navigate(['dashboard'])
    }, error => {
        this.loading = false;
        console.log(error)
    });
}



login() {
    this.router.navigate(['login'])
}

}
