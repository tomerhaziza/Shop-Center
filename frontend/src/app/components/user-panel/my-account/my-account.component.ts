import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UserRegisterDetails } from 'src/app/models/UserRegisterDetails';
import { StateService } from 'src/app/services/state.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  userDetails: UserRegisterDetails;
  isSavedChanges: boolean;

  constructor(public stateService: StateService, private usersService: UsersService,
    private titleService: Title) {
    this.titleService.setTitle("My Account - Shop Center")
    this.userDetails = new UserRegisterDetails(null,'','','','','','');
  }

  public cities: string[] = [
    'Tel Aviv', 'Jerusalem', 'Haifa', 'Rishon Lezion', 'Petah Tikva',
    'Ashdod', 'Netanya', 'Beer Sheva', 'Bnei Brak', 'Holon'
  ];

  onSaveChanges() {
    this.usersService.updateUserDetails(this.userDetails)
      .subscribe(successfulServerResponse => {
        this.stateService.userDetails.firstName = this.userDetails.firstName;
        this.stateService.userDetails.lastName = this.userDetails.lastName;
        this.stateService.userDetails.city = this.userDetails.city;
        this.stateService.userDetails.street = this.userDetails.street;
        this.userDetails.password = '';
        this.userDetails.confirmPassword = '';
        this.isSavedChanges = true;
      }, error => {
        console.error(error);
        this.isSavedChanges = false;
      });
  }

  public passwordsDontMatch(formData) {
    if (this.userDetails.password !== this.userDetails.confirmPassword) {
      formData.form.controls['confirmPassword'].setErrors({ 'passwordsDontMatch': true });
    }

    if (this.userDetails.password == this.userDetails.confirmPassword) {
      formData.form.controls['confirmPassword'].setValue(this.userDetails.password)
    }
  }

  ngOnInit(): void {
    if (this.stateService.userDetails) {
      this.userDetails.firstName = this.stateService.userDetails.firstName;
      this.userDetails.lastName = this.stateService.userDetails.lastName;
      this.userDetails.city = this.stateService.userDetails.city;
      this.userDetails.street = this.stateService.userDetails.street;
    }
  }

}
