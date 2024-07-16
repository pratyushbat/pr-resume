import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { AlertService } from './alert.service';
import { AuthUtils } from '../utility/auth-utils';

@Injectable()
export class HttpService {
  private baseUrl = 'http://localhost:5000/api';
  AUTH_TOKEN = 'auth_token';

  constructor(private httpClient: HttpClient, private alertService: AlertService) {
  }

  get(url: string, params?: any): Observable<any> {
    const data = { params, headers: this.getAuthHeader() };
    return this.httpClient
      .get(this.baseUrl + url, data).pipe(catchError(this.errorHandler.bind(this)));
  }

  post(url: string, body: any, params?: any): Observable<any> {
    const data = { params, headers: this.getAuthHeader() };
    return this.httpClient
      .post(this.baseUrl + url, body, data).pipe(catchError(this.errorHandler.bind(this)));
  }

  patch(url: string, body: any): Observable<any> {
    return this.httpClient.patch(this.baseUrl + url, body, { headers: this.getAuthHeader() }).pipe(catchError(this.errorHandler.bind(this)));
  }

  delete(url: string, body?: any): Observable<any> {
    return this.httpClient.request('delete', this.baseUrl + url,
      { body, headers: this.getAuthHeader() });
  }

  private errorHandler(response: any) {
    const error = response.error;
    let message = response.message;
    const status = response.status;
    if (error) {
      var keys = Object.keys(error);
      const key = keys[0];
      message = error[key];

      if (error[key][0] instanceof Array) {
        message = error[key][0];
      }
      if (key === 'isTrusted') {
        message = 'please connect to internet'
      }
      this.alertService.error(message);

    }
    if (status === 401) {
      // auth token delete
      // redirect login page
    }
    this.alertService.error(message);
    return throwError({ message, error });
  }

  private getAuthHeader(): { [header: string]: string | string[]; } {
    return {
      Authorization: `Bearer ${AuthUtils.getAuthToken()}`
    };
  }


  // private getPreAuthHeader(): { [header: string]: string | string[]; } {
  //   return { 'Content-Type': 'application/json' }
  // }

}
