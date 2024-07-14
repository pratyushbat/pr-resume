import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map, Observable, pipe } from 'rxjs';
import { ApiService } from './services/api.service';
import { AlertService } from './services/alert.service';
import { User, UserRes } from './model/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  mode='login';
  title = 'pr-resume';
  loginForm: FormGroup;
  signUpForm: FormGroup;
  myObserver: Observable<unknown> | any;
  loading: boolean = false
  user!:User;
  constructor(private httpCLient: HttpClient, private apiService: ApiService, private alertService: AlertService) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.maxLength(12), Validators.minLength(8)]),
    })
    this.signUpForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.maxLength(12), Validators.minLength(8)]),
      confirm_password: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      experience_level: new FormControl(null, [Validators.required]),
      job_category: new FormControl(null, [Validators.required]),
    })
  }

  ngOnInit(): void {
    // const p1: any = { page: 2, abc: 1 };
    // this.apiService.getParamUser(p1).pipe(map((data: any) => data.users)).subscribe(data => {
    //   this.alertService.success('done!');
    // }, err => console.log(err, 'app component'))
  }

  login() {
    this.loading = true;
    const login$ =this.apiService.loginUser(this.loginForm.value);    
    login$.subscribe((data:UserRes) => {
      this.loading = false;
      this.user=data.user;
      console.log(data);
      this.alertService.success('Login Successful')
    }, error => {
      this.loading = false;
      console.log(error)
    });
  }

  signup() {
    console.log(this.loginForm.value)
    this.loading = true;
    this.apiService.signUpUser(this.loginForm.value).subscribe(data => {
      this.loading = false;
      console.log(data);
      this.alertService.success('Signup Successful')
    }, error => {
      this.loading = false;
      console.log(error)
    });
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
