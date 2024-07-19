import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AuthUtils } from '../utility/auth-utils';
import { ApiService } from '../services/api.service';
import { filter, map, take } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { AuthRepository } from '../repository/repository/auth-repository';

@Injectable()
export class AnonGuard implements CanActivate {
    constructor(private router: Router, private authRepo: AuthRepository,@Inject(PLATFORM_ID) private platformId: any) {

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        const isLoggedIn = isPlatformBrowser(this.platformId)?!AuthUtils.getAuthToken():null;
        if (isLoggedIn)        // if (!AuthUtils.getAuthToken())
            return true;
        else {
            //condition to navigate after login
            // if verified is false - ->verify
            // if verified is true,onboarding:false - ->onboarding
            // if verified is true,onboarding:0 - ->onboarding
            // if verified is true,onboarding:2000 - ->dashboard

            // return this.apiSerivice.fetchMe().pipe(take(1),map((data: any) => {
            //     if (!data.verified)
            //         this.router.navigate(['verify']);
            //     else if (data.onboarding !== 200)
            //         this.router.navigate(['on-boarding']);
            //     else
            //         this.router.navigate(['dashboard']);
            // }));
            const user$ = this.authRepo.fetchMe();
            return user$.pipe(filter(data => !!data), map(data => {
              if (!data.verified) {
                this.router.navigate(['verify']);
              } else if (data.onboarding !== 200) {
                this.router.navigate(['on-boarding']);
              } else {
                this.router.navigate(['dashboard', 'resume']);
              }
            }));
        }

    }
}