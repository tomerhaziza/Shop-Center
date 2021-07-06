import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CartItem } from 'src/app/models/CartItem';
import { ProductToCartDetails } from 'src/app/models/ProductToCartDetails';
import { CartService } from 'src/app/services/cart.service';
import { StateService } from 'src/app/services/state.service';
import { ProductDialogComponent } from '../../products/product-dialog/product-dialog.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  @Input()
  item: CartItem

  public apiUrl = environment.apiUrl;

  constructor(private cartService: CartService, public stateService: StateService, public matDialog: MatDialog) { }

  public removeFromCart() {
    this.cartService.removeProductFromCart(this.item.id)
      .subscribe(successfulServerResponse => {
        this.removeFromCartUi();
      }, error => {
        console.log(error);
      });
  }

  public removeFromCartUi(){
    this.stateService.shoppingCart.totalPrice -= this.item.totalPrice;
    this.stateService.shoppingCart.cartItems = this.stateService.shoppingCart.cartItems.filter( item => item.id !== this.item.id );
  }

  public increaseAmount() {
    let amount:number = this.item.amount+1;
    this.updateProductAmountInCart(amount);
  }

  public decreaseAmount() {
    let amount:number = this.item.amount-1;
    this.updateProductAmountInCart(amount);
  }

  public updateProductAmountInCart(amount) {
    let productDetails: ProductToCartDetails =
     new ProductToCartDetails(this.item.id, amount, this.item.price,
                              this.item.price * amount,
                              this.stateService.shoppingCart.id);

    this.cartService.updateProductAmountInCart(productDetails)
      .subscribe(successfulServerResponse => {
        // Update cart item locally
        if (amount == 0){ // If item removed, remove from array
          return this.removeFromCartUi();
        }
        this.item.amount = amount;
        this.item.totalPrice = this.item.price * amount;
        this.calcTotalPrice();
      }, error => {
        console.log(error);
      });
  }

  calcTotalPrice(){
    let totalPrice = 0;
    for (let item of this.stateService.shoppingCart.cartItems){
      totalPrice += item.totalPrice;
    }

    this.stateService.shoppingCart.totalPrice = totalPrice;
  }

  public openDialog() {
    if (this.stateService.isInCheckout) {
      return;
    }

    this.matDialog.open(ProductDialogComponent,
      {
        panelClass: 'app-dialog',
        data: this.item
      });
  }

  public searchedInCart() {
    if (this.stateService.cartSearchQuery) {
      if (this.stateService.cartSearchQuery.trim() == '') {
        return false;
      }

      if (this.item.name.toLowerCase().includes(this.stateService.cartSearchQuery.trim())) {
        return true;
      }
    }
    return false;
  }

  ngOnInit(): void {
  }

}
