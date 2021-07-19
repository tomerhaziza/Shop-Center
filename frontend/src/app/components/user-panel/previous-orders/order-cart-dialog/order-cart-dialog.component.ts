import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-order-cart-dialog',
  templateUrl: './order-cart-dialog.component.html',
  styleUrls: ['./order-cart-dialog.component.css']
})
export class OrderCartDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,  public matDialog: MatDialog) { }

  ngOnInit(): void {
  }

}
