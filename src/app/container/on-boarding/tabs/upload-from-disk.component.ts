import {Component} from '@angular/core';

@Component({
  selector: 'app-upload-from-disk',
  template: `

    <div style="margin-top: 3%" fxLayout="column" fxLayoutAlign="start center" fxLayoutGap="50px">
      <h1 class="tabs-heading">Select a video from your computer to upload</h1>
      <mat-hint style="font-size: 1rem">(Upload your introduction video for Resume)</mat-hint>
      <button mat-raised-button color="primary">
        <mat-icon>add</mat-icon>
        <span>Select</span>
      </button>
    </div>
  `,
  styles: [`
  `]
})

export class UploadFromDiskComponent {

  constructor() {
  }
}
