import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor( public stateService : StateService ) { }

  public onOpenCart(){
    this.stateService.isCartOpen = true;
  }

  ngOnInit(): void {
  }

}
