import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatLineModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';

const materialComps = [
  CommonModule, MatInputModule,
  MatCardModule, MatIconModule, MatLineModule, MatRadioModule, MatProgressSpinnerModule,
  MatButtonModule, MatToolbarModule, MatFormFieldModule, MatDialogModule

]
@NgModule({
  declarations: [],
  imports: [materialComps], exports: [materialComps]
})
export class MaterialModule { }
