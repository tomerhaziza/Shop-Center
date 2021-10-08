import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserDetails } from '../models/UserDetails';
import { StateService } from '../services/state.service';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {


  constructor(private stateService: StateService, private usersService: UsersService,
    private router: Router) { }

  async canActivate(): Promise<boolean> {
    // If there's token, get user info for application
    if (this.stateService.userAuth.isGuest){
      return true
    }
    if (!this.stateService.userAuth.isGuest) {

      if (!this.stateService.userAuth.isLoggedIn) {
        await this.usersService.getUserInfo()
          .then((userInfoResponse: UserDetails) => {
            this.stateService.userDetails = userInfoResponse;

            this.stateService.userAuth.isLoggedIn = true;
            this.stateService.userAuth.isGuest = false;

            if (userInfoResponse.role == 'ADMIN') {
              this.stateService.userAuth.isAdmin = true;
            }
          }).catch((error) => {
            console.error(error);
            // If user not found by token or if token is invalid, delete the token and force logout
            this.stateService.forceLogout();
            // return false
            return true
          });
      }
    }

    return true;
  }

}