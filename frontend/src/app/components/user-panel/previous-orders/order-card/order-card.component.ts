import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Cart } from 'src/app/models/Cart';
import { Order } from 'src/app/models/Order';
import { CartService } from 'src/app/services/cart.service';
import { StateService } from 'src/app/services/state.service';
import { MatDialog } from '@angular/material/dialog';
import { OrderCartDialogComponent } from '../order-cart-dialog/order-cart-dialog.component';


@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.css']
})
export class OrderCardComponent implements OnInit {

  @Input()
  order: Order

  orderCart: Cart;

  constructor(public stateService: StateService, private cartService: CartService, public matDialog: MatDialog) { }

  public moment(date, type) {
    if (type == 'order') {
      return moment(date).format('MM/DD/YYYY')
    }
    if (type == 'delivery') {
      return moment(date).format('dddd, MM/DD/YYYY')
    }
  }

  onGetOrderCart() {
    this.cartService.getCartById(this.order.cartId)
      .subscribe(orderCart => {
        this.orderCart = orderCart;
        this.onOpenCartDialog();
      }, error => {
        console.log(error);
      });
  }


  public onOpenCartDialog() {
    this.matDialog.open(OrderCartDialogComponent,
      {
        panelClass: 'app-dialog',
        data: {cart: this.orderCart,
               order: this.order}
      });

  }

  ngOnInit(): void {
  }

}
