import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PayService {

  constructor(private _HttpClient:HttpClient ) { }

  headToken:any={
    token:localStorage.getItem('u.token')
}

  payment(cartId:string, paymentObject:any):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
    {
      shippingAddress:paymentObject
    }
    )
  }
}
