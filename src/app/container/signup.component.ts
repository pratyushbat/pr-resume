import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User, UserRes } from '../model/user';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../services/api.service';
import { AlertService } from '../services/alert.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signup',
    template: `
    <form  [formGroup]="signUpForm" class="overlay" fxLayoutAlign="center center" fxLayout="column" fxLayoutGap="40px" (ngSubmit)="signUpForm.valid && signup()">
  <img width="25%" src="assets/digiresume-green.png" />
  <mat-card fxLayout="column" appearance="raised"  >
    <h2  >Sign Up</h2>
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
    <mat-form-field style="margin-top:0.5rem" >
      <mat-label>Confirm Password</mat-label>
      <input formControlName="confirm_password"  matInput placeholder="Confirm Password" />
      <mat-error>Confirm Password is required</mat-error>
    </mat-form-field>
    <mat-form-field style="margin-top:0.5rem" >
      <mat-label>Name</mat-label>
      <input formControlName="name"  matInput placeholder="Name" />
      <mat-error>Name is required</mat-error>
    </mat-form-field>
    <mat-form-field style="margin-top:0.5rem" >
      <mat-label>Job Category</mat-label>
      <input formControlName="job_category"  matInput placeholder="Job Category" />
      <mat-error>Job Category is required</mat-error>
    </mat-form-field>
    <mat-form-field style="margin-top:0.5rem" >
      <mat-label>Experience Level</mat-label>
      <input formControlName="experience_level"  matInput placeholder="Experience Level" />
      <mat-error>Experience Level is required</mat-error>
    </mat-form-field>          
    <div fxLayout ="row" fxLayoutGap="20px" fxLayoutAlign="end">
      <mat-spinner *ngIf="loading" diameter="40" color="accent"></mat-spinner> 
      <button type="button" (click)="login()" class="primary" color="primary" mat-raised-button >Login</button>
      <button  type="submit"  class="accent" color="accent"  mat-raised-button>Signup</button>
    </div>
  </mat-card>

<!-- </div> -->
</form>
    `,
    styles: [`
        mat-card {
    padding: 10px;
    height: 47rem;
    width: 35rem;
}
.overlay {
      width: 100%;
      height: 100%;
    }
        `]
})
export class SignupComponent implements OnInit {

    signUpForm: FormGroup;
    loading: boolean = false
    user!: User;
    constructor(private apiService: ApiService, private alertService: AlertService, private router: Router) {
        this.signUpForm = new FormGroup({
            email: new FormControl(null, [Validators.required, Validators.email]),
            password: new FormControl(null, [Validators.required, Validators.maxLength(12), Validators.minLength(8)]),
            confirm_password: new FormControl(null, [Validators.required]),
            name: new FormControl(null, [Validators.required]),
            experience_level: new FormControl(null, [Validators.required]),
            job_category: new FormControl(null, [Validators.required]),
        })
    }

    ngOnInit(): void {
    }

    signup() {
        this.loading = true;
        this.apiService.signUpUser(this.signUpForm.value).subscribe(data => {
            this.loading = false;
            console.log(data);
            this.alertService.success('Signup Successful.');
            this.router.navigate(['login'])
        }, error => {
            this.loading = false;
            console.log(error)
        });
    }

    login() {
        this.router.navigate(['login'])
    }

}
