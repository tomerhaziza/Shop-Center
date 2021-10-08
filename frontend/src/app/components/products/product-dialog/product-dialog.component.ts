import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { Product } from 'src/app/models/Product';
import { ProductToCartDetails } from 'src/app/models/ProductToCartDetails';
import { CartService } from 'src/app/services/cart.service';
import { StateService } from 'src/app/services/state.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent implements OnInit {
  public amount: number = 1;
  public error: boolean;
  public totalPrice: number;

  constructor(@Inject(MAT_DIALOG_DATA) public product:Product, private cartService: CartService,
               public stateService: StateService,  public matDialog: MatDialog) { 
                  this.totalPrice = this.amount * this.product.price;
                }

  public onIncreaseAmount() {
    this.amount++;
    this.updateTotalPrice();
  }

  public onDecreaseAmount() {
    if (this.amount <= 1) {
      return this.amount = 1;
    }
    this.amount--;
    this.updateTotalPrice();
  }

  public updateTotalPrice(){
    this.totalPrice = this.amount*this.product.price;
  }

  public onAddToCart() {
    if (this.amount <= 0 || !+this.amount) {
      this.error = true;
      return this.amount = 1;
    }
    this.error = false;

    let productDetails = new ProductToCartDetails(this.product.id,
      this.amount,
      this.product.price,
      this.product.price * this.amount,
      this.stateService.shoppingCart.id
    )

    this.cartService.addProductToCart(productDetails)
    .subscribe(successfulServerResponse => {
      // Update shopping cart
      this.getUpdatedCart();
      this.amount = 1; // Reset product amount
      this.closeDialog();
    }, error => {
      console.log(error);
    });
  }

  public getUpdatedCart() {
    this.stateService.forceShoppingCartUpdate();
  }
  
  public closeDialog(){
    this.matDialog.closeAll();
  }

  ngOnInit(): void {
  }

}
