import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { filter, map, Observable, take } from 'rxjs';
import { ApiService } from '../services/api.service';
import { AuthRepository } from '../repository/repository/auth-repository';

@Injectable({
    providedIn: 'root'
})
export class VerificationInComplete implements CanActivate {

    constructor(private router: Router, private authRepo: AuthRepository) {

    }

    
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): any {
        // return this.apiSerivice.fetchMe().pipe(map((data: any) => {
        //     if (!data.verified)
        //         return true;
        //     else
        //         this.router.navigate(['dashboard']);
        // }));
        return this.authRepo.fetchMe().pipe(filter(data => !!data), map(data => {
            if (!data.verified) {
              return true;
            } else {
              this.router.navigate(['dashboard']);
            }
          }));
    }
}
