import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-checkout-complete-dialog',
  templateUrl: './checkout-complete-dialog.component.html',
  styleUrls: ['./checkout-complete-dialog.component.css']
})
export class CheckoutCompleteDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public completedOrder: any, public stateService: StateService, public matDialog: MatDialog, private router: Router) { }

  private setting = {
    element: {
      dynamicDownload: null as HTMLElement
    }
  }

  dynamicDownloadTxt() {
    let cartItems = ``
    for (let item of this.completedOrder.shoppingCart.cartItems) {
      cartItems +=
        `${item.name}    |  Price: ${item.price}  |  Amount: ${item.amount}   |  Total: ${item.totalPrice}
      ------------------------------------------------------------------------
      `
    }

    this.dyanmicDownloadByHtmlTag({
      fileName: 'Order #' + this.completedOrder.orderId,
      text:
        `
      Order #${this.completedOrder.orderId} receipt:
      For: ${this.stateService.userDetails.firstName} ${this.stateService.userDetails.lastName}
      
      Delivery to: ${this.completedOrder.orderDetails.city}, ${this.completedOrder.orderDetails.street}
      Delivery Date: ${this.completedOrder.orderDetails.deliveryDate.toDateString()}
      
      Shopping Cart Items:
      ------------------------------------------------------------------------
      ${cartItems}

      Total Price: ${this.completedOrder.orderDetails.totalPrice}
      Billed by credit cart ending in ${this.completedOrder.orderDetails.creditCardNumber}

      Thank you for shopping with us!
      `
    });

  }

  private dyanmicDownloadByHtmlTag(arg: {
    fileName: string,
    text: string
  }) {
    if (!this.setting.element.dynamicDownload) {
      this.setting.element.dynamicDownload = document.createElement('a');
    }
    const element = this.setting.element.dynamicDownload;
    const fileType = arg.fileName.indexOf('.json') > -1 ? 'text/json' : 'text/plain';
    element.setAttribute('href', `data:${fileType};charset=utf-8,${encodeURIComponent(arg.text)}`);
    element.setAttribute('download', arg.fileName);

    var event = new MouseEvent("click");
    element.dispatchEvent(event);
  }

  onClose() {
    this.matDialog.closeAll();
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.stateService.forceShoppingCartUpdate();
    this.router.navigate(['/']);
  }

}
