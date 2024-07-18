import { Component, OnInit } from '@angular/core';
import { takeWhile } from 'rxjs';
import { ResumeRepository } from '../repository/repository/resume-repository';
import { Resume } from '../model/resume';
import { Router } from '@angular/router';

@Component({
    selector: 'onboarding-name',
    template: `

    <mat-horizontal-stepper *ngIf="!this.loading">
      <mat-step>
        <ng-template matStepLabel>Name your Resume</ng-template>
        <app-resume-name [isCompleted]="isFirstStepCompleted"></app-resume-name>
      </mat-step>
      <mat-step *ngIf="this.isFirstStepCompleted" optional>
        <ng-template matStepLabel>Upload Video & Image</ng-template>      
        <app-upload></app-upload>
      </mat-step>
      <mat-step>
        <ng-template matStepLabel>Resume Form</ng-template>
        <!-- <app-resume-form></app-resume-form> -->
        <div fxLayout="column" fxLayoutAlign="center center" fxFlex="100%">
          <button (click)="finish()" style="margin-top: 1rem" mat-raised-button color="accent">Finish</button>
        </div>
      </mat-step>
    </mat-horizontal-stepper>
    <div *ngIf="this.loading" style="height: 100vh" fxLayout="column" fxLayoutAlign="center center">
      <mat-spinner></mat-spinner>
    </div>
    `,
    styles: [``]
})
export class OnBoardingComponent implements OnInit {
    resume!: Resume;
    isFirstStepCompleted = false;
    loading = false;
    isAlive = true;

    constructor(private resumeRepo: ResumeRepository, private router: Router) {
    }

    ngOnDestroy() {
        this.isAlive = false;
    }

    ngOnInit() {
        // const observer$ = this.resumeRepo.fetchAllResumes();
        // const resume$ = observer$[2];
        // resume$.pipe(takeWhile(() => this.isAlive)).subscribe(data => {
        //   if (data.length) {
        //     this.resume = data[0];
        //     this.isFirstStepCompleted = true;
        //     this.loading = false;
        //   }
        // });

        this.resumeRepo.fetchAllResumes().subscribe(data => {
            if (data.length) {
                this.resume = data[0];
                this.isFirstStepCompleted = true;
                this.loading = false;
            }
        })
    }

    finish() {
        // this.resumeRepo.updateOnBoarding({onboarding: 200}).subscribe((data:any) => {
        //   this.router.navigate(['dashboard']);
        // });
    }
}
