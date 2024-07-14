import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map, Observable, pipe } from 'rxjs';
import { ApiService } from './services/api.service';
import { AlertService } from './services/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'pr-resume';
  loginForm: FormGroup;
  myObserver: Observable<unknown> | any;

  constructor(private httpCLient: HttpClient, private apiService: ApiService,private alertService:AlertService) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.maxLength(12), Validators.minLength(8)]),
    })
  }

  ngOnInit(): void {
    const p1: any = { page: 2, abc: 1 };
    this.apiService.getParamUser(p1).pipe(map((data: any) => data.users)).subscribe(data => {
     this.alertService.success('done!');
    },err=>console.log(err,'app component'))
  }

  login() {


  }

  signup() {

  }

  extrafun() {
    // const loginObs = this.loginForm.valueChanges.pipe(map(data => data.email), debounceTime(500), distinctUntilChanged())
    // loginObs.subscribe(data => {
    //   console.log(data);
    // })
    // const filterObserver = this.loginForm.valueChanges.pipe(filter(data =>{return data.email==='pratyush@gmail.com' && this.loginForm.valid}))
    // filterObserver.subscribe(data=>{
    //   console.log(data);
    // });    
    // const mapObserver = this.loginForm.valueChanges.pipe(map(data =>{return data.email;}))
    // mapObserver.subscribe(data=>{
    //   console.log(data);
    // })
    // this.myObserver.subscribe((data: any) => console.log(data))
  }

}
