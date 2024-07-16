import { Component, OnInit } from '@angular/core';
import { AlertService } from '../services/alert.service';
import { ApiService } from '../services/api.service';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User, UserRes } from '../model/user';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    template: `
    
    <form [formGroup]="loginForm" class="overlay" fxLayoutAlign="center center" fxLayout="column" fxLayoutGap="40px" (ngSubmit)="loginForm.valid && login()">
        <!-- <div  > -->
        <img width="25%" src="assets/digiresume-green.png" />
        <mat-card fxLayout="column" appearance="raised"  >
            <h2  >Log In</h2>
            <p>Please fill in this form to create an account.</p>
            <mat-form-field style="margin-top:0.5rem">
            <mat-label>Email</mat-label>
            <input  formControlName="email" type="email" matInput placeholder="Email" />
            <mat-error>Valid Email is required</mat-error>
            </mat-form-field>
            <mat-form-field style="margin-top:0.5rem" >
            <mat-label>Password</mat-label>
            <input formControlName="password" type="password" matInput placeholder="Password" />
            <mat-error>(8-12 digit)Password is required</mat-error>
            </mat-form-field>   
            <a style=" color: brown;
            cursor: pointer;
            margin-top: 2rem;
            font-palette: dark; "  (click)="forgotPwd()">Forgot password</a>   
            <div fxLayout ="row" fxLayoutGap="20px" fxLayoutAlign="end">
            <mat-spinner *ngIf="loading" diameter="40" color="accent"></mat-spinner> 
            <button  type="submit"  class="accent" color="accent"  mat-raised-button>Login</button>
            <button type="button" (click)="signup()" class="primary" color="primary" mat-raised-button >Signup</button>
            </div>
        </mat-card>
        <!-- </div> -->
    </form>

`,
    styles: [`
        mat-card {
    padding: 10px;
    height: 27rem;
    width: 35rem;
}
.overlay {
      width: 100%;
      height: 100%;
    }
        `]
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    loading: boolean = false
    user!: User;

    constructor(private apiService: ApiService, private alertService: AlertService, private router: Router) {
        this.loginForm = new FormGroup({
            email: new FormControl(null, [Validators.required, Validators.email]),
            password: new FormControl(null, [Validators.required, Validators.maxLength(12), Validators.minLength(8)]),
        })
    }

    ngOnInit(): void {
    }

    login() {
        this.loading = true;
        const login$ = this.apiService.loginAndSetToken(this.loginForm.value);
        login$.subscribe((data: UserRes) => {
            this.loading = false;
            this.user = data.user;
            console.log(data);
            this.alertService.success('Login Successful');
            this.router.navigate(['verify'])
        }, error => {
            this.loading = false;
            console.log(error)
        });
    }

    signup() {
        this.router.navigate(['signup'])
    }

    forgotPwd() {
        this.router.navigate(['forgot-password'])
    }

}
