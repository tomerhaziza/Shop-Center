import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLoginDetails } from 'src/app/models/UserLoginDetails';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductsService } from 'src/app/services/products.service';
import { StateService } from 'src/app/services/state.service';
import { UsersService } from 'src/app/services/users.service';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { Title } from "@angular/platform-browser";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public userLoginDetails: UserLoginDetails;
  public productsCount: number;
  public ordersCount: number;

  constructor(private usersService: UsersService, private productsService: ProductsService,
    private ordersService: OrdersService, public stateService: StateService,
    private router: Router, private authService: SocialAuthService,
    private titleService: Title) {
    this.userLoginDetails = new UserLoginDetails('', '');
    this.titleService.setTitle("Login - Shop Center");
  }

  public getProductsInStoreCount() {
    this.productsService.getProductsInStoreCount()
      .subscribe(productsCount => {
        this.productsCount = productsCount;
      }, error => {
        console.log(error);
      });
  }

  public getOrdersInStoreCount() {
    this.ordersService.getOrdersInStoreCount()
      .subscribe(ordersCount => {
        this.ordersCount = ordersCount;
      }, error => {
        console.log(error);
      });
  }

  public onLogin(formData): void {
    this.usersService.login(this.userLoginDetails)
      .subscribe(userDetails => {

        this.stateService.userAuth.isLoggedIn = true; // Set user login status
        this.stateService.userAuth.isGuest = false;
        this.stateService.userDetails = userDetails;

        if (userDetails.role == 'ADMIN') {
          this.stateService.userAuth.isAdmin = true;
        }

        this.router.navigate(["/"]);
      }, error => {
        if (error.error.error == 'User does not exist') {
          formData.form.controls['email'].setErrors({ 'wrongEmail': true });
        }

        if (error.error.error == 'Login failed, invalid user name or password') {
          formData.form.controls['password'].setErrors({ 'wrongPassword': true });
        }

      });
  }


  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }


  async ngOnInit(): Promise<void> {
    this.getProductsInStoreCount();
    this.getOrdersInStoreCount();

    this.authService.authState.subscribe((user) => {
      this.stateService.googleUser = user;

      if (user) {
        let token = { token: user.idToken };
        this.usersService.oauthLogin(token)
          .subscribe(userDetails => {
            if (this.stateService.googleUser) {
              this.stateService.userAuth.isLoggedIn = true; // Set user login status
              this.stateService.userAuth.isGuest = false;
              this.stateService.userDetails = userDetails;
              this.router.navigate(["/"]);
            }
          }, error => {
            console.log(error);
          });
      }
    });
  }

}
