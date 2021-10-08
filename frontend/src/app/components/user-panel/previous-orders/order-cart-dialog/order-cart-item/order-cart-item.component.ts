import { Component, Input, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/CartItem';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order-cart-item',
  templateUrl: './order-cart-item.component.html',
  styleUrls: ['./order-cart-item.component.css']
})
export class OrderCartItemComponent implements OnInit {

  @Input()
  item: CartItem

  constructor() { }

  ngOnInit(): void {
  }

}
