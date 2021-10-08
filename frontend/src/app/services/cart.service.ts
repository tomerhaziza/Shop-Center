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
    return this.http.get<Cart>(`/api/cart/last`);
  }

  public addProductToCart(productData: ProductToCartDetails): Observable<void>{
    return this.http.post<void>(`/api/cart/add-product`, productData);
  }

  public updateProductAmountInCart(productData): Observable<void>{
    return this.http.put<void>(`/api/cart/update-amount`, productData);
  }

  public removeProductFromCart(productId): Observable<void>{    
    return this.http.delete<void>(`/api/cart/remove-product/` + productId);
  }

  public emptyShoppingCart(): Observable<void>{
    return this.http.delete<void>(`/api/cart/empty`);
  }

  public getCartById(cartId) : Observable<Cart>{
    return this.http.get<Cart>(`/api/cart/${cartId}`);
  }

}
