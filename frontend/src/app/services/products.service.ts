import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewProductDetails } from '../models/NewProductDetails';
import { Product } from '../models/Product';
import { ProductToEditDetails } from '../models/ProductToEditDetails';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http : HttpClient) { }

  public getProductsInStoreCount() : Observable<number>{
    return this.http.get<number>(`http://${environment.apiUrl}/api/products/count`);
  }

  public addProduct(newProductDetails : NewProductDetails): Observable<any>{
    return this.http.post(`http://${environment.apiUrl}/api/products`, newProductDetails);
  }

  public changeProduct(productToCartDetails : ProductToEditDetails) : Observable<void>{
    return this.http.put<void>(`http://${environment.apiUrl}/api/products`, productToCartDetails);
  }

  public getProductsByCategory(categoryId:number) : Observable<Product[]>{
    return this.http.get<Product[]>(`http://${environment.apiUrl}/api/products/` + categoryId);
    }

  public searchProduct(searchQuery:string) : Observable<Product[]>{
    return this.http.get<Product[]>(`http://${environment.apiUrl}/api/products/search/?q=` + searchQuery);
  }

  public upload(uploadData: FormData) : Observable<any>{
    return this.http.post(`http://${environment.apiUrl}/api/upload`, uploadData);
  }

  public getBestSellers() : Observable<Product[]>{
    return this.http.get<Product[]>(`http://${environment.apiUrl}/api/products/popular`);
  }

  public deletePhoto(imageName:string) : Observable<void>{
    return this.http.delete<void>(`http://${environment.apiUrl}/api/upload/delete/` + imageName);
  }

}