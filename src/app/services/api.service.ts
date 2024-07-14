import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';


@Injectable()
export class ApiService {
  constructor(private httpService: HttpService) {
  }

  getAllUser(): Observable<any[]> {
    return this.httpService.get('/userssss')
      .pipe(map(data => data as any[]));
  }
  getParamUser(p1:any): Observable<any[]> {
    return this.httpService.get('/userssss',p1)
      .pipe(map(data => data as any[]));
  }

  
  loginUser(body:any): Observable<any> {
    return this.httpService.post('/auth/login',body);
  }

 
}
