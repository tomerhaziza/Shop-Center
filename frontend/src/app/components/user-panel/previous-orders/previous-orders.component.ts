import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/Order';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-previous-orders',
  templateUrl: './previous-orders.component.html',
  styleUrls: ['./previous-orders.component.css']
})
export class PreviousOrdersComponent implements OnInit {

  allOrders: Order[];
  page: number;
  isNextPage: boolean;

  constructor( private ordersService : OrdersService ) { 
    this.page = 1;
  }

  public getAllUserOrders(page?) {
    if (page == 'next' && this.isNextPage){
      this.page++
    }

    if (page == 'back' && this.page > 1){
      this.page--
    }

    if (page == 'next' && !this.isNextPage) return;
    
    this.ordersService.getAllUserOrders(this.page)
    .subscribe(allOrders => {
      this.isNextPage = false;
      if (allOrders[10]){
        allOrders.splice(10);
        this.isNextPage = true;
      }
      this.allOrders = allOrders;        
    }, error => {
      console.log(error);
    });
    if (page == 'back' && this.page == 1) return;
  }

  ngOnInit(): void {
    this.getAllUserOrders();
  }

}
