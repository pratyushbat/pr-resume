import {Component, OnDestroy} from '@angular/core';

import {take, takeWhile} from 'rxjs/operators';
import {Router} from '@angular/router';
import { AuthRepository } from '../../repository/repository/auth-repository';

@Component({
  selector: 'app-header',
  template: `
    <div fxLayout="row" fxLayoutAlign="start center" class="header-container">
      <img class="res-header-image" style="width: 15%" src="../../../assets/digiresume-light-green.png">
      <span fxFlex="1 1 auto"></span>
      <div fxHide.xs fxFlex="1 1 auto" fxLayout="row" fxLayoutGap="10px" fxLayoutAlign="start center">
        <button routerLinkActive="selected"
                routerLink="resume" class="nav-bar-button" mat-button>Resumes
        </button>
        <button routerLinkActive="selected" routerLink="settings" class="nav-bar-button" mat-button>Settings</button>
        <button (click)="logout()" class="nav-bar-button" mat-button>Logout</button>
        <span fxFlex="35%"></span>
        <div class="username" fxLayoutAlign="start center" fxLayout="row" fxLayoutGap="10px">
          <mat-icon>account_circle</mat-icon>
          <span>{{this.userName}}</span>
        </div>
      </div>
      <div fxHide.gt-xs>
        <button style="color: #a8ee90 !important;"
                [matMenuTriggerFor]="menu"
                mat-icon-button>
          <mat-icon>dehaze</mat-icon>
        </button>
        <mat-menu style="opacity: 0.5;" direction="vertical" [overlapTrigger]="false" #menu>
          <div fxLayoutGap="30px" fxFlex="100%" fxLayout="column" fxLayoutAlign="center center" class="res-menu">
            <div fxLayoutGap="10px" fxLayoutAlign="start center" class="username" fxLayout="row">
              <mat-icon>account_circle</mat-icon>
              <span>{{this.userName}}</span>
            </div>
            <button routerLinkActive="selected"
                    routerLink="resume" class="nav-bar-button" mat-button>Resumes
            </button>
            <button routerLinkActive="selected" routerLink="settings" class="nav-bar-button" mat-button>Settings</button>
            <button (click)="logout()" class="nav-bar-button" mat-button>Logout</button>
          </div>
        </mat-menu>
      </div>
    </div>
  `,
  styles: [`
    .header-container {
      background: #4c86bd;
      height: 10%;
      width: 100%;
      padding-left: 2rem;
    }

    .username {
      color: #a8ee90;
      font-weight: bold;
      text-decoration: none;
      text-transform: uppercase;
    }

    .nav-bar-button {
      color: #a8ee90 !important;
      background: transparent;
      font-size: 1rem;
      text-transform: uppercase;
    }

    .res-menu {
      width: 100vw !important;
      height: 100vh !important;
      margin-top: -1rem !important;
    }

    .nav-bar-button:hover {
      border-bottom: 1px solid #ffdab4;
      color: #ffdab4 !important;
    }

    .selected {
      border: 1px solid #a8ee90;
    }
  `]
})

export class HeaderComponent implements OnDestroy {
  userName = '';
  isAlive = true;

  constructor(private authRepo: AuthRepository, private router: Router) {
    // ,take(1)
    this.authRepo.fetchMe().pipe(takeWhile(() => this.isAlive)).subscribe(user => {
      this.userName = user.name;
    });
  }

  ngOnDestroy() {
    this.isAlive = false;
  }

  logout() {
    this.router.navigate(['logout']);
  }
}
