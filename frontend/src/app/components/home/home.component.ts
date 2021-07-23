import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/Order';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductsService } from 'src/app/services/products.service';
import { StateService } from 'src/app/services/state.service';  
import { environment } from 'src/environments/environment';
import {Title} from "@angular/platform-browser";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public productsCount: number;
  public ordersCount: number;
  public lastOrder: Order;
  public firstPurchase: boolean;
  public lastOrderDate: Date;
  public apiUrl = environment.apiUrl;

  constructor( private productsService: ProductsService, private ordersService: OrdersService,
               public stateService: StateService, private router : Router,
               private titleService:Title ) {
               this.lastOrder = new Order(null, null, null, '', '', null, null, null, null)
               this.titleService.setTitle("Shop Center");;
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

  public getLastOrder() {
    this.ordersService.getLastOrder()
      .subscribe(lastOrder => {
        if (lastOrder) {
          return this.lastOrder = lastOrder;
        }
        this.firstPurchase = true;
      }, error => {
        console.log(error);
      });
  }

  public onShopButtonClick(){
    this.router.navigate(['/categories']);
    this.stateService.isCartOpen = true;
  }

  ngOnInit(): void {
    this.getProductsInStoreCount();
    this.getOrdersInStoreCount();
    if (this.stateService.userAuth.isLoggedIn){
      this.getLastOrder();
    }
  }

}