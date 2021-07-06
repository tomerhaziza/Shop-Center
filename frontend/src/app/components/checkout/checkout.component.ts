import { Component, OnInit } from '@angular/core';
import { NewOrderDetails } from 'src/app/models/NewOrderDetails';
import { OrdersService } from 'src/app/services/orders.service';
import { StateService } from 'src/app/services/state.service';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CheckoutCompleteDialogComponent } from './checkout-complete-dialog/checkout-complete-dialog.component';
import { Cart } from 'src/app/models/Cart';
import {Title} from "@angular/platform-browser";


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  public newOrderDetails: NewOrderDetails;
  public busyDaysList: number[] = [];
  public today: string;

  constructor( private ordersService: OrdersService, public stateService: StateService,
               private router: Router, private matDialog: MatDialog,
               private titleService:Title ) {
    this.newOrderDetails = new NewOrderDetails('', '', null, null, null, null);
    this.today = new Date().toISOString().split('T')[0];
    this.titleService.setTitle("Checkout - Shop Center");
  }

  public cities: string[] = [
    'Tel Aviv', 'Jerusalem', 'Haifa', 'Rishon Lezion', 'Petah Tikva',
    'Ashdod', 'Netanya', 'Beer Sheva', 'Bnei Brak', 'Holon'
  ];

  public moment(date) {
    return moment(date).format('dddd MM/DD')
  }

  public onOrder() {
    // Validations
    this.validate();

    this.newOrderDetails.totalPrice = this.stateService.shoppingCart.totalPrice;
    this.newOrderDetails.cartId = this.stateService.shoppingCart.id;
    let shoppingCart: Cart = this.stateService.shoppingCart;

    this.ordersService.completeCheckout(this.newOrderDetails)
      .subscribe(successfullCheckoutResponse => {
        let orderId = successfullCheckoutResponse.insertId;
        this.openCheckoutCompleteDialog(shoppingCart, orderId);
      }, error => {
        console.log(error);
      });
  }

  public validate() {
    if (!+this.newOrderDetails.creditCardNumber || !this.newOrderDetails.city ||
      !this.newOrderDetails.street || !this.newOrderDetails.deliveryDate ||
      !this.newOrderDetails.creditCardNumber ||
      new Date(this.newOrderDetails.deliveryDate).getTime() < new Date().getTime() ||
      new Date(this.newOrderDetails.deliveryDate).setHours(10) < new Date().setHours(0),
      this.busyDaysList.find(x => x == new Date(this.newOrderDetails.deliveryDate).getTime()) ) {
      return;
    }
  }

  public openCheckoutCompleteDialog(shoppingCart: Cart, orderId: number) {
    this.matDialog.open(CheckoutCompleteDialogComponent,
      {
        panelClass: 'app-dialog',
        disableClose: true,
        data: {
          orderId: orderId,
          orderDetails: this.newOrderDetails,
          shoppingCart: shoppingCart
        }
      });
  }

  public getBusyDeliveryDays() {
    // Get days with more than 3 orders
    this.ordersService.getBusyDays()
      .subscribe(busyDeliveryDays => {
        for (let date of busyDeliveryDays) {
          // Make array of dates in time format to compare later
          this.busyDaysList.push(new Date(date.deliveryDate).getTime());
        }
      }, error => {
        console.log(error);
      });
  }

  public busyDaysFilter = (d): boolean => {
    // Filter for material UI datepicker (busy days)
    if (d) {
      const time = d.getTime();
      return !this.busyDaysList.find(x => x == time);
    }
  }

  ngOnInit(): void {
    this.getBusyDeliveryDays();
    this.stateService.isInCheckout = true;
    this.stateService.isCartOpen = true;

    setTimeout(() => {
      if (!this.stateService.shoppingCart.cartItems.length) {
        // If user has no items in cart, return to home component
        this.router.navigate(['/']);
        return;
      }
    }, 2000);

    setTimeout(() => {
      if (this.stateService.userDetails) {
        this.newOrderDetails.city = this.stateService.userDetails.city;
      }
    }, 10);
  }

  ngOnDestroy() {
    this.stateService.isInCheckout = false;
    this.stateService.cartSearchQuery = '';
  }
}
