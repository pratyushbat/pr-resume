import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AuthUtils } from '../utility/auth-utils';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router,@Inject(PLATFORM_ID) private platformId: any) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        const isLoggedIn = isPlatformBrowser(this.platformId)? !!AuthUtils.getAuthToken():null;
        // strinbg to boolean
        if (isLoggedIn)
        if (!!AuthUtils.getAuthToken())
            return true;
        else
            this.router.navigate(['']);
    }
}