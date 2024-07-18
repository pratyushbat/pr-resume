import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-on-boarding-intro',
  template: `
    <div style="margin-top: 3rem" class="overlay" fxLayout="column" fxLayoutAlign="start center" fxLayoutGap="50px">
      <img width="36%" src="../../../assets/digiresume-green.png">
      <h1 class="res-onboarding-title">Welcome to Make my resume!</h1>
      <h2 class="res-onboarding-desc">From the whole team here, thank you for trying us. We are committed to make it easier for you to do
        great work.</h2>
      <button color="accent" mat-raised-button (click)="navigate()">Let's Go!</button>
    </div>
  `,
  styles: [`
    h1 {
      color: rgb(125, 226, 97);
      font-weight: bold;
      font-size: 2.5rem;
    }


    h2 {
      color: rgba(51, 51, 51, 0.5);
    }
  `]
})

export class OnBoardingIntroComponent {

  constructor(private router: Router) {
  }

  navigate() {
    this.router.navigate(['on-boarding', 'add']);
  }
}
