import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthObject } from 'src/app/models/UserAuthObject';
import { UserDetails } from 'src/app/models/UserDetails';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  host: {
    '(document:click)': 'closeUserMenu($event)',
  }
})
export class NavbarComponent implements OnInit {

  public userAuth: UserAuthObject;
  public dropdownOpen: boolean;

  constructor(public stateService: StateService, private router: Router,
              private _eref: ElementRef) {
    this.userAuth = this.stateService.userAuth;
  }

  public onOpenCart(){
    this.stateService.isCartOpen = true;
  }

  public openUserMenu(){
    if (this.dropdownOpen){
      return this.dropdownOpen = false;
    }
    this.dropdownOpen = true;
  }

  public closeUserMenu(event) {
    if (!this._eref.nativeElement.contains(event.target)) // or some similar check
      this.dropdownOpen = false;
  }

  ngOnInit(): void {
  }

}
