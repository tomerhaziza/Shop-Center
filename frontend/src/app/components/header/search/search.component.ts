import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {

  public searchQuery: string;

  constructor(private router: Router, public stateService: StateService) {
    this.searchQuery = '';
  }

  public onSearchProduct() {
    if (this.searchQuery.trim() == '') {
      return;
    }

    this.router.navigate(['products/search'], { queryParams: { q: this.searchQuery.trim() } });
    this.searchQuery = '';
  }

  ngOnInit(): void {
  }

}
