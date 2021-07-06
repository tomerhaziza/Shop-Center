import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product } from 'src/app/models/Product';
import { ProductToCartDetails } from 'src/app/models/ProductToCartDetails';
import { ProductToEditDetails } from 'src/app/models/ProductToEditDetails';
import { CartService } from 'src/app/services/cart.service';
import { StateService } from 'src/app/services/state.service';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { environment } from 'src/environments/environment';
import { CartItem } from 'src/app/models/CartItem';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  animations: [
    trigger('buttonTextStateTrigger', [
      state('shown', style({
        opacity: 1
      })),
      state('transitioning', style({
        opacity: 0.5
      })),
      transition('shown => transitioning', animate('200ms ease-out')),
      transition('transitioning => shown', animate('200ms ease-in'))
    ])
  ]
})
export class ProductComponent implements OnInit {

  @Input()
  product: Product

  public error: boolean;
  public apiUrl = environment.apiUrl;
  public amount: number;

  constructor(private cartService: CartService, public stateService: StateService, public matDialog: MatDialog) {
    this.amount = 1;
  }

  // The current state of the button text
  buttonTextState = 'shown';
  // The text currently being show
  buttonText = 'Add to cart';
  // The text that will be shown when the transition is finished
  transitionButtonText = 'Add to cart';

  /**
   * Respond to the transition event of the button text
   * by setting the text awaiting transition then setting the state as shown
   */
  buttonTextTransitioned(event) {
    this.buttonText = this.transitionButtonText;
    this.buttonTextState = this.buttonTextState = 'shown';
  }

  public onIncreaseAmount() {
    this.amount++;
  }

  public onDecreaseAmount() {
    if (this.amount <= 1) {
      return this.amount = 1;
    }
    this.amount--;
  }

  public onAddToCart() {
    if (this.amount <= 0 || !+this.amount) {
      this.error = true;
      return this.amount = 1;
    }
    this.error = false;
    // Kick off the first transition
    this.buttonTextState = 'transitioning';
    this.transitionButtonText = 'Adding...';

    let productDetails: ProductToCartDetails =
      new ProductToCartDetails(this.product.id,
        this.amount,
        this.product.price,
        this.product.price * this.amount,
        this.stateService.shoppingCart.id
      )

    this.cartService.addProductToCart(productDetails)
      .subscribe(successfulServerResponse => {
          this.buttonTextState = 'transitioning';
          this.transitionButtonText = `${this.amount} Added`;
    
        // Reset button text
        setTimeout(() => {
          this.buttonTextState = 'transitioning';
          this.transitionButtonText = 'Add to cart';
        }, 2000);
        // Update shopping cart
        let itemInCartIndex = this.stateService.shoppingCart.cartItems.findIndex(v => v.id === this.product.id);
        if (itemInCartIndex >= 0) {
          this.stateService.shoppingCart.cartItems[itemInCartIndex].amount += this.amount;
          this.stateService.shoppingCart.cartItems[itemInCartIndex].totalPrice += productDetails.totalPrice;
        }

        else {
          let cartItem: CartItem = new CartItem(this.product.id, this.product.name, this.product.price, productDetails.amount, productDetails.totalPrice, this.product.imageUrl)
          this.stateService.shoppingCart.cartItems.push(cartItem)
        }

        this.stateService.shoppingCart.totalPrice += productDetails.totalPrice;
        this.amount = 1; // Reset product amount
      }, error => {
        console.log(error);
        this.buttonTextState = 'transitioning';
        this.transitionButtonText = 'Failed, Try again';
  
      // Reset button text
      setTimeout(() => {
        this.buttonTextState = 'transitioning';
        this.transitionButtonText = 'Add to cart';
      }, 2000);
      });
  }

  public onChangeProduct() {
    let product: ProductToEditDetails =
      new ProductToEditDetails(this.product.id, this.product.name, this.product.price,
        this.product.imageUrl, this.product.categoryId);
    this.stateService.onChangeProduct(product);
  }

  public openDialog() {
    if (!this.stateService.userAuth.isAdmin) {
      this.matDialog.open(ProductDialogComponent,
        {
          panelClass: 'app-dialog',
          data: this.product
        });
    }
  }

  ngOnInit(): void {
  }

}
