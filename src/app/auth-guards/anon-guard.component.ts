import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AuthUtils } from '../utility/auth-utils';
import { ApiService } from '../services/api.service';
import { map } from 'rxjs';

@Injectable()
export class AnonGuard implements CanActivate {
    constructor(private router: Router, private apiSerivice: ApiService) {

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        if (!AuthUtils.getAuthToken())
            return true;
        else {
            //condition to navigate after login
            // if verified is false - ->verify
            // if verified is true,onboarding:false - ->onboarding
            // if verified is true,onboarding:0 - ->onboarding
            // if verified is true,onboarding:2000 - ->dashboard

            return this.apiSerivice.fetchMe().pipe(map((data: any) => {
                if (!data.verified)
                    this.router.navigate(['verify']);
                else if (data.onboarding !== 200)
                    this.router.navigate(['on-boarding']);
                else
                    this.router.navigate(['dashboard']);
            }));
        }

    }
}