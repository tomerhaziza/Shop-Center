import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { StateService } from 'src/app/services/state.service';
import { ActivatedRoute } from "@angular/router";
import { Product } from 'src/app/models/Product';
import {Title} from "@angular/platform-browser";


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {


  public searchQuery: string;
  public productsList: Product[];
  public categoryId: number;
  public noResults: boolean;

  constructor(private productsService: ProductsService, public stateService: StateService,
              private route: ActivatedRoute, private titleService:Title) { 
              }

  public getProducts() {
    // Get trending products for Home component
    if(window.location.pathname === '/'){
      return this.getBestSellers();
    }
    
    // Get products by search query (from URL)
    this.route.queryParamMap.subscribe(queryParams => { // Get query from URL
      this.productsList = null;
      this.searchQuery = queryParams.get("q");
      if (this.searchQuery) { // If there is a query, search product
        return this.getProductsBySearchQuery();
      }
    })

    // If there's no query,
    // Get products by category (from URL)
    if (!this.searchQuery) {
      this.route.paramMap.subscribe(params => { // Get category ID from url
        this.productsList = null;
        this.categoryId = +params.get("category");
        this.stateService.currentCategory = this.categoryId; // To set current category in navbar active class
        return this.getProductsByCategoryId(this.categoryId);
      })
    }
  }

  public getProductsByCategoryId(categoryId: number) {
    this.productsService.getProductsByCategory(categoryId) // Get product for desired category
      .subscribe(products => {
        this.productsList = products;
      }, error => {
        if (error.status == 401){ // If token invalid/not exist, force logout
          this.stateService.forceLogout();
        }
      });
  }

  public getProductsBySearchQuery() {
    this.noResults = false;
    this.productsService.searchProduct(this.searchQuery)
      .subscribe(searchResults => {
        if (!searchResults.length) { // If no results
          this.noResults = true;
          return this.productsList = null;
        }
        this.productsList = searchResults;
        
      }, error => {
        console.log(error);
      });
  }

  public getBestSellers() {
    this.productsService.getBestSellers()
      .subscribe(bestSellersList => {
        this.productsList = bestSellersList;
        
      }, error => {
        console.log(error);
      });
  }

  ngOnInit(): void {    
    this.getProducts();

    this.stateService.detectProductsUpdateEvent
      .subscribe(() => {
        this.getProducts();
      });
  }

  ngAfterViewChecked(){
    // Set page title
    if (this.searchQuery) {
      this.titleService.setTitle(this.searchQuery + " - Shop Center");
    }

    if (!this.searchQuery && window.location.pathname !== '/') {
      if (this.stateService.categoriesList){
        this.titleService.setTitle(this.stateService.categoriesList[this.categoryId-1].name + " - Shop Center");
      }
    }
  }

  ngOnDestroy() {
    this.stateService.currentCategory = 0;
  }

}
