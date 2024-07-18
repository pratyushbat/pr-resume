import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import { AlertService } from '../../../services/alert.service';
import { ResumeRepository } from '../../../repository/repository/resume-repository';
import { Resume } from '../../../model/resume';


@Component({
  selector: 'app-upload-image',
  template: `
    <div *ngIf="!loading" style="margin-top: 3%" fxLayout="column" fxLayoutAlign="start center" fxLayoutGap="50px">
      <input (change)="onImageSelect($event)" accept="image/jpeg, image/png" #fileInput hidden type="file"/>
      <h1 class="tabs-heading">
        <mat-icon>cloud_upload</mat-icon>
        Upload Profile Image
      </h1>
      <mat-hint style="font-size: 1rem">Image size must be upto 2mb</mat-hint>
      <button (click)="this.onFileSelect()" mat-raised-button color="primary" type="button" *ngIf="!isUploaded">
        <mat-icon>{{selectButtonIcon}}</mat-icon>
        <span *ngIf="!isSelected">SELECT</span>
        <span *ngIf="isSelected">CHANGE</span>
      </button>
      <img height="200px" #previewImg [src]="this.url">
      <button (click)="save()" *ngIf="this.isSelected && !this.isUploaded" mat-raised-button color="accent">Save</button>
      <button (click)="delete()" *ngIf="this.isSelected && this.isUploaded" mat-raised-button color="accent">Delete</button>
    </div>
    <div style="height: 100vh" fxLayout="column" fxLayoutAlign="center center">
      <mat-spinner *ngIf="this.loading"></mat-spinner>
    </div>
  `,
  styles: [`
  `]
})

export class UploadImageComponent implements AfterViewInit {
  isUploaded = false;
  isSelected = false;
  loading = false;
  selectButtonIcon = 'add';
  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChild('previewImg') previewImg!: ElementRef;
  file!: File;
  MAX_IMAGE_SIZE = 2 * 1000 * 1000;
  url = '';
  @Input() resume!: Resume;

  constructor(private alertService: AlertService, private resumeRepo: ResumeRepository) {
  }

  ngAfterViewInit() {
    this.init();
  }

  init() {
    if (this.resume) {
      this.isUploaded = !!this.resume.image_url;
      if (this.isUploaded) {
        this.isSelected = true;
        this.url = this.resume.image_url;
      }
    }
  }

  onImageSelect(value:any) {
    const file = value.target.files[0];
    this.file = file;
    if (this.file.size > this.MAX_IMAGE_SIZE) {
      return this.alertService.error('File size should be less than 2mb');
    }
    if (file.type === 'image/png' || 'image/jpg' || 'image/jpeg' || 'image/JPG') {
      this.isSelected = true;
      this.selectButtonIcon = 'cached';
      this.previewImg.nativeElement.src = window.URL.createObjectURL(this.file);
    } else {
      return this.alertService.error('Image must be of type png,jpg or jpeg');
    }
  }

  onFileSelect() {
    this.fileInput.nativeElement.click();
  }

  save() {
    this.loading = true;
    this.resumeRepo.saveOrUpdateImage(this.file, this.resume._id).subscribe(data => {
      this.loading = false;
      this.isUploaded = true;
      this.url = data.image_url;
      this.alertService.success('Image uploaded Successfully');
    }, error => {
      this.loading = false;
    });
  }

  delete() {
    this.loading = true;
    this.resumeRepo.deleteImage(this.resume._id).subscribe(data => {
      this.loading = false;
      this.alertService.success('Image deleted Successfully');
      this.isUploaded = false;
      this.isSelected = false;
      this.url = '';
    }, error => {
      this.loading = false;
    });
  }
}
