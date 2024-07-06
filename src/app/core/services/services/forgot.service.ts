import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotService {

  constructor(private _HttpClient:HttpClient) { }

  baseUrl:string = 'https://ecommerce.routemisr.com/api/v1/'

  forgot(forgotObject:object):Observable<any>{
    return this._HttpClient.post(this.baseUrl + `auth/forgotPasswords` , forgotObject)
  }

  code(codeObject:object):Observable<any>{
    return this._HttpClient.post(this.baseUrl +`auth/verifyResetCode` , codeObject)
  }

  password(passwordObject:object):Observable<any>{
    return this._HttpClient.put(this.baseUrl +`auth/resetPassword` , passwordObject)
  }
}
