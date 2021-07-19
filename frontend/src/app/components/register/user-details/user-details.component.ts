import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRegisterDetails } from 'src/app/models/UserRegisterDetails';
import { StateService } from 'src/app/services/state.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  userRegisterDetails: UserRegisterDetails;

  constructor(private stateService: StateService, private usersService: UsersService, private router: Router) {
    this.userRegisterDetails = stateService.userRegisterDetails;
  }

  public onNext(formData) {
    if (this.userRegisterDetails.password !== this.userRegisterDetails.confirmPassword) {
      return;
    }
    this.isExist(formData, 'next');
  }

  public isExist(formData, next?) {
    this.usersService.isUserAlreadyExist(this.userRegisterDetails)
      .subscribe(successfulServerResponse => {
        if (next) {
          this.router.navigate(['/register/personal-details'], { skipLocationChange: true });
        }
      }, error => {
        if (error.status == '604') {
          formData.form.controls['id'].setErrors({ 'userExist': true });
          formData.form.controls['email'].setErrors({ 'userExist': true });
          return;
        }
        if (error.status == '601') {
          return formData.form.controls['id'].setErrors({ 'userExist': true });
        }
        if (error.status == '602') {
          return formData.form.controls['email'].setErrors({ 'userExist': true });
        }

      });
  }

  public passwordsDontMatch(formData) {
    if (this.userRegisterDetails.password !== this.userRegisterDetails.confirmPassword) {
      formData.form.controls['confirmPassword'].setErrors({ 'passwordsDontMatch': true });
    }

    if (this.userRegisterDetails.password == this.userRegisterDetails.confirmPassword) {
      formData.form.controls['confirmPassword'].setValue(this.userRegisterDetails.password)
    }
  }

  ngOnInit(): void {
  }

}
