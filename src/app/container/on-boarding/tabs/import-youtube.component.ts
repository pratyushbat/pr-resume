import {AfterViewInit, Component, Input} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Resume } from '../../../model/resume';
import { ResumeRepository } from '../../../repository/repository/resume-repository';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-import-youtube',
  template: `
    <div *ngIf="!loading">
      <form *ngIf="!isVideoUploaded || this.uploadAgain" [formGroup]="youtubeForm"
            (ngSubmit)="this.youtubeForm.valid && this.uploadVideo()">
        <div style="margin-top: 3%" fxLayout="column" fxLayoutAlign="center stretch" fxLayoutGap="50px">
          <h1 style="text-align: center" class="tabs-heading">Import Video from Youtube URL</h1>
          <mat-form-field>
            <input formControlName="video_url" matInput placeholder="Enter youtube Video Url"/>
            <mat-error>Provide YouTube Video URL</mat-error>
          </mat-form-field>
          <div fxLayoutAlign="end">
            <button type="submit" mat-raised-button color="primary">Import</button>
          </div>
        </div>
      </form>
      <div *ngIf="isVideoUploaded && !this.uploadAgain" style="margin-top: 3%" fxLayout="column" fxLayoutAlign="center center"
           fxLayoutGap="50px">
        <p style="font-size: 1.5rem;font-weight: bolder">You have Already Uploaded A Video</p>
        <button (click)="this.uploadAgain = true" mat-raised-button color="primary">Update Video</button>
      </div>
    </div>
    <div style="height: 100vh" fxLayout="column" fxLayoutAlign="center center">
      <mat-spinner *ngIf="this.loading"></mat-spinner>
    </div>
  `,
  styles: [``]
})

export class ImportYoutubeComponent implements AfterViewInit {
  youtubeForm: FormGroup;
  isVideoUploaded = false;
  uploadAgain = false;
  loading = false;
  YOUTUBE_REGEX = '^((?:https?:)?\\/\\/)?((?:www|m)\\.)?((?:youtube\\.' +
    'com|youtu.be))(\\/(?:[\\w\\-]+\\?v=|embed\\/|v\\/)?)([\\w\\-]+)(\\S+)?$';
  @Input() resume!: Resume;

  ngAfterViewInit() {
    this.isVideoUploaded = !!this.resume?.video_url;
  }

  constructor(private resumeRepo: ResumeRepository, private alertService: AlertService) {
    this.youtubeForm = new FormGroup({
      video_url: new FormControl(null, [Validators.required, Validators.pattern(this.YOUTUBE_REGEX)])
    });
  }

  uploadVideo() {
    this.loading = true;
    throw this.resumeRepo.addVideo(this.resume._id, this.youtubeForm.value).subscribe((data:any) => {
      this.loading = false;
      const message = this.isVideoUploaded ? 'Video Updated Successfully' : 'Video uploaded SuccessFully';
      this.isVideoUploaded = true;
      this.alertService.success(message);
    }, (error:any) => {
      this.loading = false;
    });
  }
}
