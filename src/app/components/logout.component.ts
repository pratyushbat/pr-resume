import {Component, OnInit} from '@angular/core';

import {Router} from '@angular/router';
import { AuthRepository } from '../repository/repository/auth-repository';

@Component({
  selector: 'app-logout',
  template: `
  `,
  styles: [``]
})

export class LogoutComponent {

  constructor(private authRepo: AuthRepository, private router: Router) {
    this.authRepo.logout();
    this.router.navigate(['']);
    // this.router.navigate(['demo', {outlets: {'chat-r': ['chat']}}]);
// final soolution
    // window.open('/(chat-r:chat)', '_self');
  }
}
