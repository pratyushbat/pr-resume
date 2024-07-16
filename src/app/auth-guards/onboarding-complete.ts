import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ApiService } from '../services/api.service';

@Injectable({
    providedIn: 'root'
})
export class OnBoardingComplete implements CanActivate {

    constructor(private router: Router, private apiSerivice: ApiService) {

    }

    
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): any {
        return this.apiSerivice.fetchMe().pipe(map(data => {
            if (data.onboarding ===200)
                return true;
            else{
                this.router.navigate(['on-boarding']);
            }
        }));
    }

    
}
