import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/services/state.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public apiUrl = environment.apiUrl;

  constructor(public stateService: StateService) { }

  ngOnInit(): void {    
  }
}