import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-search-cart',
  templateUrl: './search-cart.component.html',
  styleUrls: ['./search-cart.component.css']
})
export class SearchCartComponent implements OnInit {

  constructor(public stateService: StateService) { }

  public clearSearch() {
    this.stateService.cartSearchQuery = '';
  }

  ngOnInit(): void {
  }

}
