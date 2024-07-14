import { Component, OnInit } from '@angular/core';
import { AlertService } from '../services/alert.service';
import { ApiService } from '../services/api.service';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User, UserRes } from '../model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  template: `
    dashboard begins
`,
  styles: [` `]
})
export class DashboardComponent {


}
