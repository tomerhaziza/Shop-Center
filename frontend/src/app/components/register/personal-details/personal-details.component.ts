import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLoginDetails } from 'src/app/models/UserLoginDetails';
import { UserRegisterDetails } from 'src/app/models/UserRegisterDetails';
import { StateService } from 'src/app/services/state.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css']
})
export class PersonalDetailsComponent implements OnInit {

  userRegisterDetails: UserRegisterDetails;

  constructor(private usersService: UsersService, private stateService: StateService, private router: Router) {
    this.userRegisterDetails = stateService.userRegisterDetails;
  }

  public cities: string[] = [
    'Tel Aviv', 'Jerusalem', 'Haifa', 'Rishon Lezion', 'Petah Tikva',
    'Ashdod', 'Netanya', 'Beer Sheva', 'Bnei Brak', 'Holon'
  ];

  public onRegister(): void {
    this.usersService.register(this.userRegisterDetails)
      .subscribe(successfulServerResponse => {
        this.login();
        this.stateService.userRegisterDetails = new UserRegisterDetails(null, '', '', '', '', '', '');
      }, error => {
        console.error(error);
      });
  }

  public login():void{
    let userLoginDetails = new UserLoginDetails(this.userRegisterDetails.email, this.userRegisterDetails.password);

    this.usersService.login(userLoginDetails)
    .subscribe(userDetails => {
      this.stateService.userAuth.isLoggedIn = true; // Set user login status
      this.stateService.userAuth.isGuest = false;
      this.stateService.userDetails = userDetails
      this.router.navigate(["/"]);   
    }, error => {
      console.log(error);
    });
  }

  ngOnInit(): void {
    // If data from step 1 are missing, return to step 1
    if (this.userRegisterDetails.email.trim() == '' ||
        this.userRegisterDetails.password.trim() == '' ||
        this.userRegisterDetails.confirmPassword.trim() == '') {
        this.router.navigate(['register']);
    }
  }

}
