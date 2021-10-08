import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { StateService } from 'src/app/services/state.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  host: {
    '(document:click)': 'closeMenu($event)',
  }
})
export class CategoriesComponent implements OnInit {

  public isMenuOpen: boolean;

  constructor(private categoriesService: CategoriesService, public stateService: StateService,
              private router: Router, private _eref: ElementRef) { }

  public onNavigate(category) {
    this.router.navigate([`categories/${category.id}`]);
    this.isMenuOpen = false;
  }

  public condition(categoryId) {
    if (categoryId == this.stateService.currentCategory) {
      return true;
    }
  }

  public onOpenMenu() {
    if (!this.isMenuOpen) {
      return this.isMenuOpen = true;
    }
    return this.isMenuOpen = false;
  }

  public closeMenu(event) {
    if (!this._eref.nativeElement.contains(event.target)) // or some similar check
      this.isMenuOpen = false;
  }

  ngOnInit(): void {
    this.categoriesService.getAllCategories()
      .subscribe(categories => {
        this.stateService.categoriesList = categories;
      }, error => {
        console.log(error);
      });

  }

}