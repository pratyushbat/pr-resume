import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ResumeRepository } from '../../repository/repository/resume-repository';
// import {Resume} from '../../models/resume';
// import {ApiService} from '../../services/api-service';
// import {ResumeRepository} from '../../repository/resume-repository';

@Component({
  selector: 'app-resume-name',
  template: `
    <div class="container" fxLayoutAlign="center center" fxLayout="column">
      <form (ngSubmit)="this.resumeForm.valid && this.createResume()" [formGroup]="this.resumeForm">
        <mat-card *ngIf="!isCompleted && !loading" fxFlex="100%" fxLayout="column" fxLayoutGap="20px">
          <h1 style="font-size: 2rem">Name your Resume</h1>
          <mat-form-field>
            <input formControlName="name"
                   matInput placeholder="Resume Name"/>
            <mat-hint>It can't be seen by others</mat-hint>
            <mat-error>This field is Required</mat-error>
          </mat-form-field>
          <div fxLayoutAlign="end end">
            <button matStepperNext type="submit" mat-raised-button color="accent">Save</button>
          </div>
        </mat-card>
        <div *ngIf="isCompleted && !loading" fxLayout="column" fxLayoutGap="30px" fxLayoutAlign="start center">
          <img width="8%" src="../../../assets/complete.png"/>
          <p>You Have already Completed This Step</p>
          <button color="accent" mat-raised-button matStepperNext type="button">Next</button>
        </div>
      </form>
      <mat-spinner *ngIf="loading"></mat-spinner>
    </div>
  `,
  styles: [`

    .container {
      height: 100vh;
  
    }
  `]
})

export class ResumeNameComponent implements OnInit {
  resumeForm: FormGroup;
  @Input() isCompleted = false;
  loading = false;

  constructor( private resumeRepo: ResumeRepository) {
    this.resumeForm = new FormGroup({
      name: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit() {
    
  }

  createResume() {
    this.loading = true;
    this.resumeRepo.saveResume(this.resumeForm.value).subscribe((data:any) => {
      this.loading = false;
      this.isCompleted = true;
    }, (error:any) => {
      this.loading = false;
    });
  }
}
