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
    return this.http.get<number>(`/api/products/count`);
  }

  public addProduct(newProductDetails : NewProductDetails): Observable<any>{
    return this.http.post(`/api/products`, newProductDetails);
  }

  public changeProduct(productToCartDetails : ProductToEditDetails) : Observable<void>{
    return this.http.put<void>(`/api/products`, productToCartDetails);
  }

  public getProductsByCategory(categoryId:number) : Observable<Product[]>{
    return this.http.get<Product[]>(`/api/products/` + categoryId);
    }

  public searchProduct(searchQuery:string) : Observable<Product[]>{
    return this.http.get<Product[]>(`/api/products/search/?q=` + searchQuery);
  }

  public upload(uploadData: FormData) : Observable<any>{
    return this.http.post(`/api/upload`, uploadData);
  }

  public getBestSellers() : Observable<Product[]>{
    return this.http.get<Product[]>(`/api/products/popular`);
  }

  public deletePhoto(imageName:string) : Observable<void>{
    return this.http.delete<void>(`/api/upload/delete/` + imageName);
  }

}