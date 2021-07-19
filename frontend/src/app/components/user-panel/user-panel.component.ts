import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit {

  activeTab: string;

  constructor(public stateService: StateService, private router: Router) { 
    router.events.subscribe((event:any) => {
      if (event.url){
        if (event.url == '/account'){
          this.activeTab = 'account'
        }
        if (event.url == '/account/orders'){
          this.activeTab = 'orders'
        }
      }
  });  
  }

  ngOnInit(): void {
    this.stateService.isCartOpen = false;
  }

}
