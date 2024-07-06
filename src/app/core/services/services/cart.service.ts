import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ObservableInputTuple } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _HttpClient:HttpClient) { }

  //vars
  cartNum:BehaviorSubject <number> = new BehaviorSubject(0)
  baseUrl:string = 'https://ecommerce.routemisr.com/api/v1/'
  headToken:any={
      token:localStorage.getItem('u.token')
  }

  addProduct(prodId:any):Observable<any>{
    return this._HttpClient.post(this.baseUrl + `cart` ,
    {
      productId: prodId
    },
    {
      headers:this.headToken
    }
    )
  }

  showCartProducts():Observable<any>{
    return this._HttpClient.get(this.baseUrl + `cart`)
  }

  deleteCartProducts(prodId:string):Observable<any>{
    return this._HttpClient.delete(this.baseUrl + `cart/` + prodId
    )
  }

  clearCart():Observable<any>{
    return this._HttpClient.delete(this.baseUrl + 'cart'
    )
  }

  updateCount(prodId:string, num:number):Observable<any>{
    return this._HttpClient.put(this.baseUrl + 'cart/' + prodId ,
    {
      count:num
    })
  }
}
