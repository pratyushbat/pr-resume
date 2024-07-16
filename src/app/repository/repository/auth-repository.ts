
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Observable} from 'rxjs';
import { ApiService } from '../../services/api.service';
import { User } from '../../model/user';

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
}
