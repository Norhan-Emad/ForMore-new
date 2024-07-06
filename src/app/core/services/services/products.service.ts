import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _HttpClient:HttpClient) { }

  baseUrl:string=`https://ecommerce.routemisr.com/api/v1/`

  getProducts(pageNum:number = 1):Observable<any>{
    return  this._HttpClient.get(this.baseUrl + `products?page=${pageNum}`)
  }

  getCat():Observable<any>{
    return  this._HttpClient.get(this.baseUrl + `categories`)
  }

  getDetails(id:string|null):Observable<any>{
    return this._HttpClient.get(this.baseUrl + `products/` + id)
  }
}
