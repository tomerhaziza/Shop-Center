import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { StateService } from 'src/app/services/state.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  @ViewChild('container') private cartItemsContainer: ElementRef;

  public apiUrl = environment.apiUrl;

  constructor(private cartService: CartService, public stateService: StateService, private router: Router) { }

  public getShoppingCart() {
    this.cartService.getShoppingCart()
      .subscribe(shoppingCart => {
        this.stateService.shoppingCart = shoppingCart;
      }, error => {
        console.log(error);
      });
  }

  public emptyShoppingCart() {
    if(!this.stateService.shoppingCart.cartItems.length){
      return;
    }
    
    this.cartService.emptyShoppingCart()
    .subscribe(successfullResponse => {
      this.stateService.shoppingCart.cartItems = [];
      this.stateService.shoppingCart.totalPrice = 0;
    }, error => {
      console.log(error);
    });
  }

  public onCloseCart() {
    this.stateService.isCartOpen = false;
    if (this.stateService.userAuth.isAdmin) {
      this.stateService.isInChangeProduct = false;
    }
  }

  public onCheckout() {
    this.router.navigate(['checkout']);
  }

  public onShowAddProductComponent() {
    if (!this.stateService.isInAddProduct) {
      return this.stateService.isInAddProduct = true;
    }
    this.stateService.isInAddProduct = false;
  }

  ngOnInit(): void {
    this.getShoppingCart();

    this.stateService.detectCartUpdateEvent
      .subscribe(() => {
        this.getShoppingCart();
        this.stateService.isCartOpen = true;
      });
  }

}
