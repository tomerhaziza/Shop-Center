import { EventEmitter, Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from '../models/Cart';
import { Category } from '../models/Category';
import { ProductToEditDetails } from '../models/ProductToEditDetails';
import { UserAuthObject } from '../models/UserAuthObject';
import { UserDetails } from '../models/UserDetails';
import { UserRegisterDetails } from '../models/UserRegisterDetails';
import { SocialAuthService } from "angularx-social-login";

@Injectable({
  providedIn: 'root'
})

export class StateService {

  @Output() detectProductsUpdateEvent = new EventEmitter<string>();

  @Output() detectCartUpdateEvent = new EventEmitter<string>();

  public userAuth: UserAuthObject;

  public userDetails: UserDetails;

  public shoppingCart: Cart;

  public isCartOpen: boolean;

  public cartSearchQuery: string;

  public categoriesList: Category[];

  public currentCategory: number;

  public userRegisterDetails: UserRegisterDetails;

  public isInCheckout: boolean;

  public isInAddProduct: boolean;

  public isInChangeProduct: boolean;

  public productToEdit: ProductToEditDetails;

  public closeEditComponentTimeout: any;

  googleUser;

  constructor(private router: Router, private authService: SocialAuthService) {
    this.userAuth = new UserAuthObject(false, false);
    this.shoppingCart = new Cart(undefined, [], undefined);
    this.userRegisterDetails = new UserRegisterDetails(null, '', '', '', '', '', '');
    this.isInAddProduct = false;
    this.isInChangeProduct = false;
    this.productToEdit = new ProductToEditDetails(null, '', null, '', 3);
  }

  public onChangeProduct(product: ProductToEditDetails) {
    clearTimeout(this.closeEditComponentTimeout);
    this.productToEdit = product;
    this.isCartOpen = true;
    this.isInChangeProduct = true;
    this.isInAddProduct = false;
  }

  public forceProductsUpdate() {
    this.detectProductsUpdateEvent.emit();
  }

  public forceShoppingCartUpdate() {
    this.detectCartUpdateEvent.emit();
  }

  public forceLogout() {
    if (this.googleUser !== null){
      this.authService.signOut();
      this.googleUser = null;
    }
    this.userAuth.isLoggedIn = false;
    this.userAuth.isAdmin = false;
    this.userDetails = new UserDetails(null, '', '', '', '', '', '');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}