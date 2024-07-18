
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { User } from '../../model/user';
import { isPlatformBrowser } from '@angular/common';
import { AuthUtils } from '../../utility/auth-utils';

@Injectable()
export class AuthRepository {
  constructor(private apiService: ApiService, @Inject(PLATFORM_ID) private platformId: any) {
  }
  sendResetPasswordEmail(data: { email: string }): Observable<any> {
    return this.apiService.sendResetPasswordEmail(data);
  }

  resetPassword(data: { code: string, new_password: string, confirm_password: string }): Observable<User> {
    return this.apiService.resetPassword(data);
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      AuthUtils.removeAuthToken();
    }
    // this.store.dispatch(new LogoutAction());
  }
  fetchMe(force = false): Observable<User> {
    // const loggedIn$ = this.store.select(userLoggedIn);
    // const loggingIn$ = this.store.select(userLoggingIn);
    // const user$ = this.store.select(getUser);
    // combineLatest([loggedIn$, loggingIn$, user$]).pipe(take(1)).subscribe(data => {
    //   if (!data[0] && !data[1] || force) {
    //     this.store.dispatch(new UserProfileRequestAction());
    //     this.apiService.fetchMe().subscribe(user => {
    //       this.store.dispatch(new UserProfileSuccessAction(user));
    //     });
    //   }
    // });
    // return user$;
    return this.apiService.fetchMe();
  }
}
