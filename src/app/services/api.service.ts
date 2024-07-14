import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import { UserRes } from '../model/user';


@Injectable()
export class ApiService {
  constructor(private httpService: HttpService) {
  }

  // getAllUser(): Observable<any[]> {
  //   return this.httpService.get('/users')
  //     .pipe(map(data => data as any[]));
  // }

  // getParamUser(p1:any): Observable<any[]> {
  //   return this.httpService.get('/users',p1)
  //     .pipe(map(data => data as any[]));
  // }

  
  loginUser(body:{email:string,password:string}): Observable<UserRes> {
    return this.httpService.get('/user/login',body);
  }
  
  signUpUser(body:{
    email:string,password:string,confirm_password:string,
    name:string,job_category:string ,experience_level:string}): Observable<any> {
    return this.httpService.post('/user/signup',body);
  }

 
}
