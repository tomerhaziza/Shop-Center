import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRegisterDetails } from 'src/app/models/UserRegisterDetails';
import { StateService } from 'src/app/services/state.service';
import {Title} from "@angular/platform-browser";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  constructor( private router : Router, private stateService : StateService,
               private titleService:Title ) {
                this.titleService.setTitle("Register - Shop Center");
                 }
  
  ngOnInit(): void {
    if (localStorage.getItem('token')){
      this.router.navigate(["/"]);
    }
  }

  ngOnDestroy(){
    this.stateService.userRegisterDetails = new UserRegisterDetails(null, '', '', '','', '', '', '');
  }

}
