import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { filter, map, switchMap, takeWhile } from 'rxjs/operators';
import { ResumeRepository } from '../../../repository/repository/resume-repository';
import { Resume } from '../../../model/resume';

@Component({
  selector: 'app-upload',
  template: `
    <div fxLayout="column" fxLayoutAlign="start center">
      <mat-tab-group mat-align-tabs="center" style="width: 100%" dynamicHeight color="primary" backgroundColor="accent">
        <mat-tab label="UPLOAD PROFILE IMAGE">
          <app-upload-image *ngIf="!loading" [resume]="resume"></app-upload-image>
        </mat-tab>
        <mat-tab label="UPLOAD EXISTING VIDEO">
          <app-upload-from-disk></app-upload-from-disk>
        </mat-tab>
        <mat-tab label="PASTE YOUTUBE LINK">
          <app-import-youtube  *ngIf="!loading" [resume]="resume"></app-import-youtube>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styles: [`
  `]
})

export class UploadComponent implements OnInit, OnDestroy {
  resume!: Resume;
  isAlive = true;
  loading = false;

  constructor(private route: ActivatedRoute, private resumeRepo: ResumeRepository) {
  }

  ngOnDestroy() {
    this.isAlive = false;
  }

  ngOnInit() {
    this.loading = true;
    const param$ = this.route.params;
    param$.pipe(takeWhile(() => this.isAlive), map((res: any) => res.id)).subscribe(param => {
      if (!param) {
        // const observer$:any = this.resumeRepo.fetchAllResumes();
        //  const resume$ = observer$[2]; 
        // temp
        const resume$ = this.resumeRepo.fetchAllResumes();
        resume$.pipe(takeWhile(() => this.isAlive))
          .subscribe((data: any) => {
            this.loading = false;
            this.resume = data[0];
          });
      } else {
        const resume$ = this.route.params.pipe(takeWhile(() => this.isAlive),
          map((res: any) => res.id), switchMap((id) => {
            return this.resumeRepo.getResumeById(id);
          }), filter(res => !!res));
        resume$.subscribe((data: any) => {
          this.resume = data;
          this.loading = false;
        });
      }
    });
  }
}
