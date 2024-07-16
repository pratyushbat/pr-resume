import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import { User, UserRes } from '../model/user';
import { AuthUtils } from '../utility/auth-utils';


@Injectable()
export class ApiService {
 
  constructor(private httpService: HttpService) {
  }
  
  loginAndSetToken(body:{email:string,password:string}): Observable<UserRes> {
    return this.httpService.get('/user/login',body).pipe(map(res=>{
      AuthUtils.setAuthToken(res.token);
       return res;
    }));
  }
  
  signUpUser(body:{
    email:string,password:string,confirm_password:string,
    name:string,job_category:string ,experience_level:string}): Observable<any> {
    return this.httpService.post('/user/signup',body);
  }
  
  sendResetPasswordEmail(data: { email: string }): Observable<any> {
    return this.httpService.get('/user/reset/password/email', data);
  }

  resetPassword(data: { code: string, new_password: string, confirm_password: string }): Observable<User> {
    return this.httpService.patch('/user/reset/password', data);
  }

  fetchMe():Observable<User>{
    return this.httpService.get('/user/fetch');
  }

 
}
