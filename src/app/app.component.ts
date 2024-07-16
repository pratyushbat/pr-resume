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
export class AppComponent {

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
