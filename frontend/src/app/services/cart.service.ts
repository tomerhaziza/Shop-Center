import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../models/Cart';
import { ProductToCartDetails } from '../models/ProductToCartDetails';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor( private http : HttpClient ) { }
  
  public getShoppingCart() : Observable<Cart>{
    return this.http.get<Cart>(`http://${environment.apiUrl}/api/cart/last`);
  }

  public addProductToCart(productData: ProductToCartDetails): Observable<void>{
    return this.http.post<void>(`http://${environment.apiUrl}/api/cart/add-product`, productData);
  }

  public updateProductAmountInCart(productData): Observable<void>{
    return this.http.put<void>(`http://${environment.apiUrl}/api/cart/update-amount`, productData);
  }

  public removeProductFromCart(productId): Observable<void>{    
    return this.http.delete<void>(`http://${environment.apiUrl}/api/cart/remove-product/` + productId);
  }

  public emptyShoppingCart(): Observable<void>{
    return this.http.delete<void>(`http://${environment.apiUrl}/api/cart/empty`);
  }

  public getCartById(cartId) : Observable<Cart>{
    return this.http.get<Cart>(`http://${environment.apiUrl}/api/cart/${cartId}`);
  }

}
