import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserDetails } from '../models/UserDetails';
import { StateService } from '../services/state.service';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(
    private stateService: StateService,
    private usersService: UsersService
  ) {}

  async canActivate(): Promise<boolean> {
    if (!this.stateService.userAuth.isGuest) {      
      await this.usersService
        .getUserInfo()
        .then((userInfoResponse: UserDetails) => {
          this.stateService.userDetails = userInfoResponse;

          this.stateService.userAuth.isLoggedIn = true;
          this.stateService.userAuth.isGuest = false;

          if (userInfoResponse.role == 'ADMIN') {
            this.stateService.userAuth.isAdmin = true;
          }
        })
        .catch((error) => {
          this.stateService.userAuth.isGuest = true;
          return true;
        });
    }
    return true;
  }
}
