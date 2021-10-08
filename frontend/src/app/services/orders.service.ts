import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewOrderDetails } from '../models/NewOrderDetails';
import { Order } from '../models/Order';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor( private http : HttpClient ) { }

  public getOrdersInStoreCount() : Observable<number>{
    return this.http.get<number>(`/api/orders/count`);
  }

  public completeCheckout(orderData: NewOrderDetails): Observable<any>{
    return this.http.post(`/api/orders`, orderData);
  }

  public getLastOrder(): Observable<Order>{
    return this.http.get<Order>(`/api/orders`);
  }

  public getBusyDays(): Observable<any>{
    return this.http.get<any>(`/api/orders/busy`);
  }

  public getAllUserOrders(page): Observable<Order[]>{
    return this.http.get<Order[]>(`/api/orders/all?page=${page}`);
  }

}
