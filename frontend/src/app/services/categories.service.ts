import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/Category';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor( private http : HttpClient ) { }

  public getAllCategories() : Observable<Category[]>{
    return this.http.get<Category[]>(`http://${environment.apiUrl}/api/categories`);
  }

}
